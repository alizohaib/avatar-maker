import React from 'react';
import {fabric} from 'fabric';
import {Button} from 'react-bootstrap';


class FabricCanvas extends React.Component{

	componentDidMount(){

		// Make a New Canvas
		this.the_canvas = new fabric.StaticCanvas('main-canvas', {
			preserveObjectStacking: true,
			height:375,
			width:375,
		});
	}

	componentWillReceiveProps = (newprops) =>{

		// If Updated Item is not the same as the old one
		// 		=> Update the canvas with newer item
		if(newprops.activeProperty !== this.props.activeProperty){
			this.updateCanvasforImage(this.props.activeProperty,newprops.activeProperty);
		}
	}

	updateCanvasforImage = (prev,next) => {

		if(next){

			let to_remove;
			// Find the same kind of element
			this.the_canvas.forEachObject( (object) => {

				if(object.the_type === next.the_type){
					to_remove = object;
				}
			} );

			this.the_canvas.remove(to_remove);

			if(next.the_type === 'bg'){
				this.the_canvas.setBackgroundImage(next);
				this.the_canvas.renderAll();				
				return;
			}

			this.the_canvas.add(next);
			this.the_canvas.moveTo(next, next.zIndex);
		}
	}

	saveToCanvas = () => {

		let link = document.createElement("a");
		link.href = this.the_canvas.toDataURL({format: 'png'});
      	link.download = "avatar.png";
     	link.click();

	}
	
	render(){
		
		return (
			<div className= "main-canvas-container">
				
				<canvas id= 'main-canvas'>
				</canvas>

				<Button bsStyle="success" onClick = {this.saveToCanvas} bsSize="large" block>
                	Download Avatar
              	</Button>
			</div>
		);
	}
}

export default FabricCanvas;