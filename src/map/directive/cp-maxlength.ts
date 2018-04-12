import * as _ from 'lodash';
import { Common } from '../../common';
import { Constants } from '../../constants';
import { MapDom } from '../map-dom';
import { Directive } from './directive.interface';

export class CPMaxLength implements Directive {

    private readonly element: any;
    private attribute;
    private map: MapDom;

    constructor(_element: HTMLElement, _map: MapDom) {
        this.element = _element;
        this.map = _map;
        this.attribute = Common.getAttributeCpMaxLength(this.element);
        if (this.attribute === undefined) {
            throw new Error(`syntax error ${Constants.MAX_LENGTH_ATTRIBUTE_NAME} expected arguments`);
        }
    }

    public create() {
        this.init();
    }

    public init() {
        this.attribute = this.attribute.replace(/ /g, '');
        try {
            const value = Common.evalInContext(this.attribute, Common.getScope(this.element).scope);
            if (value !== undefined) {
                this.element.setAttribute('maxlength', value);
            }
        } catch (e) { }
    }
}
