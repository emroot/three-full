//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { FloatNode } from '../inputs/FloatNode.js'
import { NodeLib } from '../core/NodeLib.js'

function TimerNode( scale, scope, timeScale ) {

	FloatNode.call( this );

	this.scale = scale !== undefined ? scale : 1;
	this.scope = scope || TimerNode.GLOBAL;

	this.timeScale = timeScale !== undefined ? timeScale : this.scale !== 1;

}

TimerNode.GLOBAL = 'global';
TimerNode.LOCAL = 'local';
TimerNode.DELTA = 'delta';

TimerNode.prototype = Object.create( FloatNode.prototype );
TimerNode.prototype.constructor = TimerNode;
TimerNode.prototype.nodeType = "Timer";

TimerNode.prototype.isReadonly = function () {

	// never use TimerNode as readonly but aways as "uniform"

	return false;

};

TimerNode.prototype.isUnique = function () {

	// share TimerNode "uniform" input if is used on more time with others TimerNode

	return this.timeScale && ( this.scope === TimerNode.GLOBAL || this.scope === TimerNode.DELTA );

};

TimerNode.prototype.updateFrame = function ( frame ) {

	var scale = this.timeScale ? this.scale : 1;

	switch ( this.scope ) {

		case TimerNode.LOCAL:

			this.value += frame.delta * scale;

			break;

		case TimerNode.DELTA:

			this.value = frame.delta * scale;

			break;

		default:

			this.value = frame.time * scale;

	}

};

TimerNode.prototype.copy = function ( source ) {

	FloatNode.prototype.copy.call( this, source );

	this.scope = source.scope;
	this.scale = source.scale;

	this.timeScale = source.timeScale;

};

TimerNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.scope = this.scope;
		data.scale = this.scale;

		data.timeScale = this.timeScale;

	}

	return data;

};

NodeLib.addKeyword( 'time', function () {

	return new TimerNode();

} );

;

export { TimerNode }
