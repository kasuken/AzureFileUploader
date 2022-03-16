import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const DropzoneComponent = () => {
  const getUploadParams = ({ meta }) => { 
    
    console.log("uploadddddddd");

    

    return { url: 'https://httpbin.org/post' } 
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
    />
  )
}

export default DropzoneComponent;