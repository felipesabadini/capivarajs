import { } from 'jasmine';
import capivara from '../../src/index';

describe('test of style with fixed object', () => {
    const template = `
        <h1 cp-style="{ background-color : $ctrl.activeStyle }"> Sample HTML text</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.activeStyle = 'red';

        $ctrl.$onInit = () => {
            it('Expected to add the style', () => {
                expect(element.querySelector('h1').style.background).toEqual('red');
            });
        };
    });
});

describe('test of style with dynamic object', () => {
    const template = `
        <h1 cp-style="$ctrl.getStyle()">String of test</h1>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.activeStyle = 'red';

        $ctrl.getStyle = () => {
            return {
                ['background-color']: $ctrl.activeStyle,
            };
        };

        $ctrl.$onInit = () => {
            it("Expected to add the class", function(done) {
                setTimeout(function() {
                    expect(element.querySelector('h1').style.backgroundColor).toEqual('red');
                    done();
                });
            });
        };
    });
});

describe('test of style with dynamic object', () => {
    const template = `
        <h1 cp-style="{background-color: $ctrl.color}">Sample HTML text</h1>
        <button id="click-btn" class="btn btn-primary" cp-click="$ctrl.click()">Clica me!</button>
    `;
    const element = document.createElement('div');
    element.innerHTML = template;
    capivara.controller(element, function() {
        const $ctrl = this;
        $ctrl.color = 'blue';

        $ctrl.click = () => {
            $ctrl.color = 'red';
        };

        $ctrl.$onInit = () => {
            it("Expected to add the class", function(done) {
                setTimeout(function() { element.querySelector('button').click(); }, 1000);
                setTimeout(function() {
                    expect(element.querySelector('h1').style.background).toEqual('red');
                    done();
                }, 2000);
            });
        };
    });
});