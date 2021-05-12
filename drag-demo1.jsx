import React from "react";

let param={
  mousedownX:0,
  mousedownY:0,
  mousemoveX:0,
  mousemoveY:0,
  currentX:0,
  currentY:0,
  currentPhoto:null,
  photoGalleryLeft:0,
  photoGalleryRight:0,
  photoGalleryTop:0,
  photoGalleryBottom:0,
}

class dragDemo1 extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      files: [],
      photosList:[],
    }
  }
  componentDidMount() {

    this.loadPhotos();
    let gallery = document.getElementById("photoGallery" )
    let flag = false;

    gallery.onmousedown = ev => {
      ev.preventDefault();

      let collections=document.getElementsByClassName("photoBox")
      for (let i = 0; i < collections.length; i++) {
        collections.item(i).style.zIndex="0"
      }

      if (ev.path.length>9){
        let photoGallery=document.getElementById("photoGallery")
        param.currentPhoto=ev.path[1]
        console.log(ev)
        param.currentX=parseInt(param.currentPhoto.style.left)
        param.currentY=parseInt(param.currentPhoto.style.top)
        param.currentPhoto.style.zIndex="1"
        param.photoGalleryLeft=photoGallery.getBoundingClientRect().left
        param.photoGalleryRight=photoGallery.getBoundingClientRect().right
        param.photoGalleryTop=photoGallery.getBoundingClientRect().top
        param.photoGalleryBottom=photoGallery.getBoundingClientRect().bottom
      }

      else {
        param.currentPhoto=undefined
      }

      param.mousedownX=ev.clientX
      param.mousedownY=ev.clientY

      if (param.currentPhoto){
        flag=true;
      }
    }

    window.onmouseup = () => {
      flag=false;
    }

    gallery.onmousemove = ev => {
      if (flag){
        ev.preventDefault();
        let photoRect=param.currentPhoto.getBoundingClientRect()
        if (photoRect){
          let left=ev.clientX-param.mousedownX+param.currentX
          let top=ev.clientY-param.mousedownY+param.currentY
          param.currentPhoto.style.left=left+"px"
          param.currentPhoto.style.top=top+"px"
          console.log(left,top)
        }
      }
    }
  }

  loadPhotos = () => {
    let photos = [image1,image2,image3,image4,image5,image6,image7,image8,image9];
    this.setState({
      photosList:photos
    })
  }

  render() {
    //components List
    const pictures=this.state.photosList.map((item,index) =>{
      return(
          <div
              key = {"card-"+index}
              className={"photoBox photo"+index}
              style={{left:0,top:0,zIndex:0}}
              id = { "photo"+index }
          >
            <Image
                src = { item }
            />
          </div>
      );
    })
    return(
        <div className="Container">
          <div className="title">
          </div>
          <div className="flexBox">
            <div className="photoGallery" id={"photoGallery"}>
              {pictures}
            </div>
          </div>
        </div>
    );
  }
}
export default demo5;
