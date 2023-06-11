import { useState } from "react";

type ImageType = {
    url: string    
}

const ImageMagic =  () => {
    const [images, setImages] = useState<ImageType[]>();
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string>("");

    const imageOptions : string[] = [
        "A German Sheperd guard dog wearing a sign saying police",
        "A house with many high-tech security cameras",
        "A peaceful and beautiful community"
      ];
    
    const surpriseMe = () => {
       // setImages([]);
        const randomValue = imageOptions[Math.floor(Math.random() * imageOptions.length)]
        setValue(randomValue);
    }

    const getImages = async () => {
        setImages([]);
        if (value === "") {
            setError("Error! Must have a search item");
            return;
        }
        try {
            const options : RequestInit = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: value
                })
            }

            const response = await fetch("http://localhost:8000/images", options);
            const data = await response.json();
            console.log(data.data);
            setImages(data);

        } catch(error) {
            console.error(error);
        }
    }

    return (
      <div className = "image-magic">
        <section className = "search-section"> 
            <div className = "rightPaneButtonWrapper">
                <button className = "leftPaneButton" onClick={surpriseMe}> Try some sample pictures 
                </button>
            </div>
            <div className = "magic-image-input-container"> 
                <input
                       value = { value } 
                       onChange = {e => setValue(e.target.value)}     
                />
                <div className="genImageWrapper">
                    <button className = "genImage" onClick = { getImages }>Generate Image</button>
                </div>
            </div>
        </section> 
        <section className = "magic-image-section"> 
            { images?.map((image, _index) => (
                <img key = {_index} src = {image.url} alt =""/>
            ))}
        </section> 
      </div>
    );
  }
  
export default ImageMagic;
  