import { useRef, useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";

function App() {
  const fileInputRef = useRef(null);
  const [filesList, setFilesList] = useState([]);
  const [numOfFiles, setNumOfFiles] = useState("No Files Choosen");

  const changeFileHandler = (e) => {
    const files = e.target.files;
    setFilesList([]);
    setNumOfFiles(`${files.length} Files Selected.`);

    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilesList(prevList => [
          ...prevList,
          {
            name: file.name,
            size: file.size,
            dataURL: reader.result
          }
        ])
      }
      reader.readAsDataURL(new Blob([file]))
    }
  }

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="container">
        <h2 className="title">Custom File Upload Button</h2>
        <p className="sub-title">
          Click the button and upload any Files! 😊
        </p>

        <input type="file" multiple ref={fileInputRef} onChange={changeFileHandler} />
        <label onClick={openFileDialog}>
          Choose Files To Upload &nbsp; 
          <RiFolderUploadFill style={{ fontSize: '28px' }} />
        </label>

        <div className="num-of-files">{numOfFiles}</div>
        <ul className="files-list">
          {
            filesList.map( (file, index) => (
              <li key={index}>
                {file.name}
                <p>{(file.size / 1024).toFixed(1)}KB</p>
                </li>
            ))
          }
        </ul>

      </div>
    </>
  );
}

export default App;
