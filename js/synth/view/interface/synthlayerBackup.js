class SynthLayerInterface {
    constructor(
        
    ) {
  
        this.elements = this.TreeOfElements();

        container.appendChild(this.elements);

    };

    //#region Getter Setter


    //#endregion

    TreeOfElements() {
        let tree = [{
                element: 'ul',
                css: ['menu'],
                children: [{
                        element: 'li',
                        css: ['menu-item'],
                        children: [{
                            element: 'a',
                            text: 'main'
                        }]
                    },
                    {
                        element: 'li',
                        css: ['menu-item'],
                        children: [{
                            element: 'a',
                            text: 'sub'
                        }]
                    }
                ]
            },
            {
                element: 'div',
                attributes: [],
                name: 'first',
                funcs: [],
                css: ['content-container'],
                children: [{
                        element: 'h1',
                        attributes: [],
                        funcs: [],
                        text: 'synth.js'
                    },
                    {
                        element: 'h2',
                        attributes: [],
                        funcs: [],
                        text: 'options'
                    },
                    {
                        element: 'label',
                        for: 'functions',
                        text: 'functions'
                    },
                    {
                        element: 'select',
                        options: [{
                                element: 'option',
                                id: 'sine',
                                value: 'sin',
                                text: 'SineWave'
                            },
                            {
                                element: 'option',
                                id: 'cosine',
                                value: 'cosin',
                                text: 'CoSineWave'
                            }
                        ],
                        name: 'functions',
                        funcs: [
                            ['change', updateFunction]
                        ]
                    },
                    {
                        element: 'label',
                        for: 'equalize',
                        text: 'equalize'
                    },
                    {
                        id: 'equalize',
                        element: 'input',
                        type: 'range',
                        name: 'equalize',
                        value: 90,
                        attributes: [
                            ['min', '0'],
                            ['max', '360'],
                            ['step', '1']
                        ],
                        funcs: [
                            ['input', updateEqualize]
                        ]
                    },
                    {
                        element: 'label',
                        for: 'gap',
                        text: 'gap'
                    },
                    {
                        id: 'gap',
                        element: 'input',
                        type: 'range',
                        name: 'gap',
                        value: 30,
                        attributes: [
                            ['min', '0'],
                            ['max', '360'],
                            ['step', '1']
                        ],
                        funcs: [
                            ['input', updateGap]
                        ]
                    },
                    {
                        element: 'label',
                        for: 'animation',
                        text: 'animation'
                    },
                    {
                        id: 'animation',
                        element: 'input',
                        type: 'range',
                        name: 'animation',
                        value: 360,
                        attributes: [
                            ['min', '0'],
                            ['max', '360'],
                            ['step', '1']
                        ],
                        funcs: [
                            ['input', updateAnimation]
                        ]
                    }
                ]
            }
        ];

        let root = document.createElement('div');

        root.id = 'interface';

        tree.forEach((child) => {
            root.appendChild(this.child(child));
        });

        return root;
    };

    child(child) {

        let elem = this.createElement(child);

        if (
            child.children != undefined &&
            child.children.length > 0
        ) {
            child.children.forEach((child) => {
                elem.appendChild(this.child(child));
            });
        };

        return elem;
    };

    createElement(element) {

        switch (element.element) {

            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':

                return createHTMLHeadingElement(element);

            case 'a':

                return createHTMLAnchorElement(element);

            case 'div':

                return createHTMLDivElement(element);

            case 'ul':

                return createHTMLUlElement(element);

            case 'li':

                return createHTMLLiElement(element);

            case 'button':

                return createHTMLButtonElement(element);

            case 'datalist':

                return createHTMLDataListElement(element);

            case 'fieldset':

                return createHTMLFieldSetElement(element);

            case 'form':

                return createHTMLFormElement(element);

            case 'input':

                return createHTMLInputElement(element);

            case 'label':

                return createHTMLLabelElement(element);

            case 'legend':

                return createHTMLLegendElement(element);

            case 'optgroup':

                return createHTMLOptGroupElement(element);

            case 'option':

                return createHTMLOptionElement(element);

            case 'output':

                return createHTMLOutputElement(element);

            case 'select':

                return createHTMLSelectElement(element);

            case 'textarea':

                return createHTMLTextAreaElement(element);

        };
    };
}