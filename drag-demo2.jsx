import React, {cloneElement} from "react";
import {Col, Image, Row} from "react-bootstrap";
import arrayMove from "./arrayMove.js";

let param={
  mousedownX:0,
  mousedownY:0,
  mousedownFlag:false,
  mousedownImage:null,
  mousedownCol:null,
  mousemoveX:0,
  mousemoveY:0,
  mouseMoveFlag:false,
  mouseUpX:0,
  mouseUpY:0,
  oldIndex:null,
}

class sortable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photosList: [],
      selected: false
    }
    this.currentImageList=[]
  }

  componentDidMount() {
    this.loadPhotos();
  }

  loadPhotos = () => {
    let photos = [image1, image2, image3, image4, image5, image6, image7,
      image8, image9];
    photos.map((img,index)=>{
      return(
          photos[index]={
            url:img,
            selected: false,
            index:index
          }
      )
    })
    this.setState({
      photosList: photos
    })
  }

  mouseDown = event => {
    event.persist()
    event.preventDefault();
    param.mousedownX = event.clientX
    param.mousedownY = event.clientY
    param.mousedownImage=event.target
    param.mousedownFlag=true;
    param.mousedownCol=event.currentTarget
    let index = parseInt(param.mousedownCol.getAttribute("index"))
    param.oldIndex=index
    window.onmousemove = ev => {
      if (param.mousedownFlag){
        if (this.currentImageList.length===0||this.currentImageList.includes(index)){
          param.mouseMoveFlag=true;
          console.log(index)
          let cloneImage = cloneElement(param.mousedownCol)
          console.log(cloneImage)
        }
        else {
          param.mousedownFlag=false;
        }
        param.mouseMoveFlag=true
      }
    }
  }
  mouseUp = event => {
    event.preventDefault();
    param.mouseUpX = event.clientX
    param.mouseUpY = event.clientY
    let index =parseInt(event.currentTarget.getAttribute("index"))
    console.log(param.oldIndex,index,this.state.photosList)
    if (param.mouseMoveFlag){
      if (this.currentImageList.length===1||this.currentImageList.length===0){
        this.setState(({photosList}) => ({
          photosList : arrayMove(photosList, param.oldIndex, index),
        }))
      }
      else {
        let arrayList = this.currentImageList
        arrayList.sort(((a, b) => {return a<b?1:-1}))
        console.log(arrayList)
        let imageList = this.state.photosList
        for (let i=0;i<arrayList.length;i++){
          console.log(imageList,arrayList[0],index)
          imageList=arrayMove(imageList,arrayList[0],index);
        }
        this.setState({
          photosList:imageList
        })
        this.currentImageList=[];
      }
    }
    else {
      let index = parseInt(param.mousedownCol.getAttribute("index"))
      console.log(index)
      if (this.currentImageList.includes(index)){
        param.mousedownImage.style.border=""
        this.currentImageList.splice(this.currentImageList.indexOf(index),1)
        console.log(this.currentImageList)
      }
      else {
        if (param.mousedownImage.children.length===0){
          param.mousedownImage.style.border="solid"
        }
        this.currentImageList.push(index)
        console.log(this.currentImageList)
      }
    }
    param.mousedownImage=null
    param.mousedownFlag=false
    param.mouseMoveFlag=false
  }

  render() {
    const pictures = this.state.photosList.map((imageItem,index)=>{
      return(
          <Col
              xl={3}
              onMouseDown={this.mouseDown}
              onMouseUp={this.mouseUp}
              key={imageItem.url+index}
              index={index}
          >
              <Image src={imageItem.url}/>
          </Col>)
    })

    return(
        <div className="likeContainer" >
          <div className="photoGallery" id={"photoGallery"}>
            <Row>
              {pictures}
            </Row>
          </div>
        </div>
    )
  }
}
export default sortable;