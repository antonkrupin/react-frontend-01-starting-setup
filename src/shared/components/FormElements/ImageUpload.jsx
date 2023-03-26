import React, { useRef } from 'react';

import Button from './Button';

import './ImageUpload.css';

const ImageUpload = (props) => {
  const { id, center } = props;

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (e) => {
    console.log(e.target);
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
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>Pick Image</Button>
      </div>
    </div>
  )
};

export default ImageUpload;