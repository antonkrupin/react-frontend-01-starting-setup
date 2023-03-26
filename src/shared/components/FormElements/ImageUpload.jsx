import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';

import './ImageUpload.css';

const ImageUpload = (props) => {
  const {
    id,
    center,
    onInput,
    errorText,
  } = props;

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) return;
    
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (e) => {
    let pickedFile;
    let isFileValid;
    if (e.target.files && e.target.files.length === 1) {
      [pickedFile] = e.target.files;
      setFile(pickedFile);
      setIsValid(true);
      isFileValid = true;
    } else {
      setIsValid(false);
      isFileValid = false;
    }
    onInput(id, pickedFile, isFileValid);
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  )
};

export default ImageUpload;