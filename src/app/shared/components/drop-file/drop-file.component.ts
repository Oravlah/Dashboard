import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgFor } from '@angular/common';

interface FilePreview {
  size: any;
  name: any;
  file: File;
  preview: string;
}

@Component({
  selector: 'app-drop-file',
  standalone: true,
  imports: [MatIconButton, MatIcon, NgFor],
  templateUrl: './drop-file.component.html',
  styleUrl: './drop-file.component.scss'
})
export class DropFileComponent {
  @Output() img64: EventEmitter<string> = new EventEmitter<string>();


  files: FilePreview[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      for (const file of Array.from(input.files)) {
        this.addFile(file);
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length) {
      for (const file of Array.from(event.dataTransfer.files)) {
        this.addFile(file);
      }
    }
  }

  addFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const filePreview: FilePreview = {
        file,
        preview: e.target?.result as string,
        size: file.size,
        name: file.name
      };
      this.files.push(filePreview);
      this.img64.emit(filePreview.preview);

    };
    reader.readAsDataURL(file);
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
  }
}
