import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const DropzoneComponent = () => {
  const getUploadParams = ({ meta , file }) => { 
    
    const body = new FormData();
    body.append('files', file);

    return { url: '/api/uploader', body } 
  }
  
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      inputContent='Drag Files or Click to Browse'
      submitButtonContent='Remove finished uploads'
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      styles={{
        dropzoneActive: { borderColor: 'green' },
      }}
    />
  )
}

export default DropzoneComponent;