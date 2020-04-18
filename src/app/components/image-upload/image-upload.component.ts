import {Component, Input, NgZone, OnInit} from '@angular/core';
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {HttpClient} from '@angular/common/http';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {ImageModel} from '../../models/image/image.model';
import {AdditemComponent} from '../../pages/additem/additem.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input()
  responses: Array<any>;

  images: ImageModel[];
  private hasBaseDropZoneOver = false;
  private uploader: FileUploader;
  private title: string;
  @Input() addItemComponent: AdditemComponent;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient
  ) {
    this.responses = [];
    this.title = '';
    this.images = [];
  }

  ngOnInit(): void {
    this.addItemComponent.images = this.images;

    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      if (this.title) {
        form.append('context', `photo=${this.title}`);
      }
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = fileItem => {

      this.zone.run(() => {
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          this.responses.push(fileItem);
        }
      });
    };

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      if (JSON.parse(response).resource_type === 'image') {
        this.images.push({imageUrl: JSON.parse(response).public_id});
        this.addItemComponent.images = this.images;
      }
      this.responses.pop();
    };

    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
