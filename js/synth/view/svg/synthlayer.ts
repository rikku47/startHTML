class SynthLayerSVG {

    //#region Fields

    private _container: HTMLElement
    private _gapX: number
    private _gapY: number
    private _isX: boolean
    private _isY: boolean
    private _leftX: boolean
    private _upY: boolean
    private _rightX: boolean
    private _downY: boolean
    private _gridNorthWest: boolean
    private _gridNorthEast: boolean
    private _gridSouthEast: boolean
    private _gridSouthWest: boolean
    private _layer: SVGElement;
    private _grid: {
        northWest: {
            x: string[],
            y: string[]

        },
        northEast: {
            x: string[],
            y: string[]

        },
        southEast: {
            x: string[],
            y: string[]

        },
        southWest: {
            x: string[],
            y: string[]

        },
    }
    private _coordinateAxes: string[]
    private _paths: any[]

    //#endregion

    //#region Getter Setter

    public get container(): HTMLElement {
        return this._container;
    }

    public set container(value: HTMLElement) {
        this._container = value;
    }

    public get gapX(): number {
        return this._gapX;
    }

    public set gapX(value: number) {
        this._gapX = value;
    }

    public get gapY(): number {
        return this._gapY;
    }

    public set gapY(value: number) {
        this._gapY = value;
    }

    public get isX(): boolean {
        return this._isX;
    }

    public set isX(value: boolean) {
        this._isX = value;
    }

    public get isY(): boolean {
        return this._isY;
    }

    public set isY(value: boolean) {
        this._isY = value;
    }

    public get leftX(): boolean {
        return this._leftX;
    }

    public set leftX(value: boolean) {
        this._leftX = value;
    }

    public get upY(): boolean {
        return this._upY;
    }

    public set upY(value: boolean) {
        this._upY = value;
    }

    public get rightX(): boolean {
        return this._rightX;
    }

    public set rightX(value: boolean) {
        this._rightX = value;
    }

    public get downY(): boolean {
        return this._downY;
    }

    public set downY(value: boolean) {
        this._downY = value;
    }

    public get gridNorthWest(): boolean {
        return this._gridNorthWest;
    }

    public set gridNorthWest(value: boolean) {
        this._gridNorthWest = value;
    }

    public get gridNorthEast(): boolean {
        return this._gridNorthEast;
    }

    public set gridNorthEast(value: boolean) {
        this._gridNorthEast = value;
    }

    public get gridSouthWest(): boolean {
        return this._gridSouthWest;
    }

    public set gridSouthWest(value: boolean) {
        this._gridSouthWest = value;
    }

    public get gridSouthEast(): boolean {
        return this._gridSouthEast;
    }

    public set gridSouthEast(value: boolean) {
        this._gridSouthEast = value;
    }

    public get layer(): SVGElement {
        return this._layer;
    }

    public set layer(value: SVGElement) {
        this._layer = value;
    }

    public get grid(): {
        northWest: {
            x: string[],
            y: string[]
        },
        northEast: {
            x: string[],
            y: string[]

        },
        southEast: {
            x: string[],
            y: string[]

        },
        southWest: {
            x: string[],
            y: string[]

        },
    } {
        return this._grid;
    }

    public set grid(value: {
        northWest: {
            x: string[],
            y: string[]
        },
        northEast: {
            x: string[],
            y: string[]

        },
        southEast: {
            x: string[],
            y: string[]

        },
        southWest: {
            x: string[],
            y: string[]

        },
    }) {
        this._grid = value;
    }

    public get coordinateAxes(): string[] {
        return this._coordinateAxes;
    }

    public set coordinateAxes(value: string[]) {
        this._coordinateAxes = value;
    }

    public get GroupsOfPoints(): any[] {
        return this._paths;
    }
    public set GroupsOfPoints(value: any[]) {
        this._paths = value;
    }

    //#endregion

    constructor(
        container: HTMLElement,
        gridNorthWest = true,
        gridNorthEast = true,
        gridSouthEast = true,
        gridSouthWest = true,
        isX = true,
        isY = true,
        gapX = 30,
        gapY = 30
    ) {
        this.container = container
        this.gridNorthWest = gridNorthWest
        this.gridNorthEast = gridNorthEast
        this.gridSouthEast = gridSouthEast
        this.gridSouthWest = gridSouthWest
        this.isX = isX
        this.isY = isY
        this.gapX = gapX
        this.gapY = gapY
        this.GroupsOfPoints = []
        this.coordinateAxes = []
        this.grid = {
            northWest: {
                x: [],
                y: []
            },
            northEast: {
                x: [],
                y: []

            },
            southEast: {
                x: [],
                y: []

            },
            southWest: {
                x: [],
                y: []

            }
        }

        this.createLayer('layer0')
        this.setLayer()
    }

    createLayer(id: string) {
        this.layer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.layer.id = id
    }

    setLayer() {
        this.layer.setAttribute('width', this.container.clientWidth.toString())
        this.layer.setAttribute('height', this.container.clientHeight.toString())
        this.container.appendChild(this.layer)
    }

    resetLayer() {
        // Clear svg
    }

    centerBase(path: any) {

        path.base.x = this.getHalfX()
        path.base.y = this.getHalfY()
    }

    getHalfX() {
        return this.layer.clientWidth / 2
    }

    getHalfY() {
        return this.layer.clientHeight / 2
    }

    getFullX() {
        return this.layer.clientWidth
    }

    getFullY() {
        return this.layer.clientHeight
    }

    drawCoordinateAxes() {

        this.coordinateAxes = [];

        let g = this.createGroup('coordinateAxes')

        let id = 'leftX'

        this.coordinateAxes.push(id)

        g.appendChild(
            this.createLine(
                id,
                this.getHalfX() + '',
                this.getHalfY() + '',
                '0',
                this.getHalfY() + '',
                'rgb(255,0,0)',
                '2'
            ))

        id = 'rightX'

        this.coordinateAxes.push(id)

        g.appendChild(
            this.createLine(
                id,
                this.getHalfX() + '',
                this.getHalfY() + '',
                this.getFullX() + '',
                this.getHalfY() + '',
                'rgb(0,0,255)',
                '2'
            ))

        id = 'topY'

        this.coordinateAxes.push(id)

        g.appendChild(
            this.createLine(
                id,
                this.getHalfX() + '',
                this.getHalfY() + '',
                this.getHalfX() + '',
                '0',
                'rgb(0,0,255)',
                '2'
            ))

        id = 'bottomY'

        this.coordinateAxes.push(id)

        g.appendChild(
            this.createLine(
                id,
                this.getHalfX() + '',
                this.getHalfY() + '',
                this.getHalfX() + '',
                this.getFullY() + '',
                'rgb(255,0,0)',
                '2'
            ))

        this.layer.appendChild(g)
    }

    private createLine(id: string, x1: string, y1: string, x2: string, y2: string, stroke: string, width: string) {

        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");

        line.id = id

        line.setAttribute('x1', x1)
        line.setAttribute('y1', y1)
        line.setAttribute('x2', x2)
        line.setAttribute('y2', y2)
        line.setAttribute('stroke', stroke)
        line.setAttribute('stroke-width', width)

        return line
    }

    private createGroup(id: string) {

        let g = document.createElementNS("http://www.w3.org/2000/svg", "g");

        g.id = id

        return g
    }

    drawGrid() {

        //              x   y   legend  inverse index
        // NorthWest    -   +   1       3       0
        // northEast    +   +   2       4       1
        // southEast    +   -   3       1       2
        // southWest    -   -   4       2       3

        let numberOfPointGroupsX = 0;
        let numberOfPointGroupsY = 0;

        if (true) {
            numberOfPointGroupsX = (Math.floor(this.getHalfX() / this.gapX))
        }

        if (true) {
            numberOfPointGroupsY = (Math.floor(this.getHalfY() / this.gapY))
        }

        if (this.isX && numberOfPointGroupsX > 0) {

            this.gridNorthWestVertical(numberOfPointGroupsX)

            this.gridNorthEastVertical(numberOfPointGroupsX)

            this.gridSouthEastVertical(numberOfPointGroupsX)

            this.gridSouthWestVertical(numberOfPointGroupsX)
        }

        if (this.isY && numberOfPointGroupsY > 0) {

            this.gridNorthWestHorizontal(numberOfPointGroupsY)

            this.gridNorthEastHorizontal(numberOfPointGroupsY)

            this.gridSouthEastHorizontal(numberOfPointGroupsY)

            this.gridSouthWestHorizontal(numberOfPointGroupsY)
        }
    }

    private gridNorthWestVertical(numberOfPointGroupsX: number) {

        if (
            this.grid.northWest != undefined
            && this.grid.northWest.x != undefined
            && this.grid.northWest.x.length != numberOfPointGroupsX
        ) {

            this.grid.northWest.x = []

            let g = this.createGroup('gridNorthWestX')

            let x = this.getHalfX()

            let counter = 0

            while (counter <= numberOfPointGroupsX) {

                let id = 'swx' + x

                this.grid.northWest.x.push(id)

                g.appendChild(
                    this.createLine(
                        id,
                        x + '',
                        this.getHalfY() + '',
                        x + '',
                        0 + '',
                        'rgb(0,0,0)',
                        '1'
                    ))

                x -= this.gapX

                counter++
            }

            this.layer.appendChild(g)
        }
    }

    private gridNorthEastVertical(numberOfPointGroupsX: number) {

        if (
            this.grid.northEast != undefined
            && this.grid.northEast.x != undefined
            && this.grid.northEast.x.length != numberOfPointGroupsX
        ) {
            this.grid.northEast.x = []

            let g = this.createGroup('gridNorthEastX')

            let x = this.getHalfX()

            let counter = 0

            while (counter <= numberOfPointGroupsX) {

                let id = 'swx' + x

                this.grid.northEast.x.push(id)

                g.appendChild(
                    this.createLine(
                        id,
                        x + '',
                        this.getHalfY() + '',
                        x + '',
                        0 + '',
                        'rgb(0,0,0)',
                        '1'
                    ))

                x += this.gapX

                counter++
            }

            this.layer.appendChild(g)
        }
    }

    private gridSouthEastVertical(numberOfPointGroupsX: number) {

        if (
            this.grid.southEast != undefined
            && this.grid.southEast.x != undefined
            && this.grid.southEast.x.length != numberOfPointGroupsX
        ) {
            this.grid.southEast.x = []

            let g = this.createGroup('gridSouthEastX')

            let x = this.getHalfX()

            let counter = 0

            while (counter <= numberOfPointGroupsX) {

                let id = 'swx' + x

                this.grid.southEast.x.push(id)

                g.appendChild(
                    this.createLine(
                        id,
                        x + '',
                        this.getHalfY() + '',
                        x + '',
                        this.getFullY() + '',
                        'rgb(0,0,0)',
                        '1'
                    ))

                x += this.gapX

                counter++
            }

            this.layer.appendChild(g)
        }
    }

    private gridSouthWestVertical(numberOfPointGroupsX: number) {

        if (
            this.grid.southWest != undefined
            && this.grid.southWest.x != undefined
            && this.grid.southWest.x.length != numberOfPointGroupsX
        ) {
            this.grid.southWest.x = []

            let g = this.createGroup('gridSouthWestX')

            let x = this.getHalfX()

            let counter = 0

            while (counter <= numberOfPointGroupsX) {

                let id = 'swx' + x

                this.grid.southWest.x.push(id)

                g.appendChild(
                    this.createLine(
                        id,
                        x + '',
                        this.getHalfY() + '',
                        x + '',
                        this.getFullY() + '',
                        'rgb(0,0,0)',
                        '1'
                    ))

                x -= this.gapX

                counter++
            }

            this.layer.appendChild(g)
        }
    }

    private gridNorthWestHorizontal(numberOfPointGroupsY: number) {

        if (
            this.grid.northWest != undefined
            && this.grid.northWest.y != undefined
            && this.grid.northWest.y.length != numberOfPointGroupsY
        ) {

            this.grid.northWest.y = []

            let g = this.createGroup('gridNorthWestY')

            let y = this.getHalfY()

            let counter = 0

            while (counter <= numberOfPointGroupsY) {

                let id = 'nwy' + y

                this.grid.northWest.y.push(id)

                g.appendChild(
                    this.createLine(
                        id,
                        this.getHalfX() + '',
                        y + '',
                        0 + '',
                        y + '',
                        'rgb(0,0,0)',
                        '1'
                    ))

                y -= this.gapY

                counter++
            }

            this.layer.appendChild(g)
        }
    }

    private gridNorthEastHorizontal(numberOfPointGroupsY: number) {

        if (
            this.grid.northEast != undefined
            && this.grid.northEast.y != undefined
            && this.grid.northEast.y.length != numberOfPointGroupsY
        ) {

            this.grid.northEast.y = []

            let g = this.createGroup('gridNorthEastY')

            let y = this.getHalfY()

            let counter = 0

            while (counter <= numberOfPointGroupsY) {

                let id = 'ney' + y

                this.grid.northEast.y.push(id)

                g.appendChild(
                    this.createLine(
                        id,
                        this.getHalfX() + '',
                        y + '',
                        this.getFullX() + '',
                        y + '',
                        'rgb(0,0,0)',
                        '1'
                    ))

                y -= this.gapY

                counter++
            }

            this.layer.appendChild(g)
        }
    }

    private gridSouthEastHorizontal(numberOfPointGroupsY: number) {

        if (
            this.grid.southEast != undefined
            && this.grid.southEast.y != undefined
            && this.grid.southEast.y.length != numberOfPointGroupsY
        ) {

            this.grid.southEast.y = []

            let g = this.createGroup('gridSouthEastY')

            let y = this.getHalfY()

            let counter = 0

            while (counter <= numberOfPointGroupsY) {

                let id = 'sey' + y

                this.grid.southEast.y.push(id)

                g.appendChild(
                    this.createLine(
                        id,
                        this.getHalfX() + '',
                        y + '',
                        0 + '',
                        y + '',
                        'rgb(0,0,0)',
                        '1'
                    ))

                y += this.gapY

                counter++
            }

            this.layer.appendChild(g)
        }
    }

    private gridSouthWestHorizontal(numberOfPointGroupsY: number) {

        if (
            this.grid.southWest != undefined
            && this.grid.southWest != undefined
            && this.grid.southWest.y.length != numberOfPointGroupsY
        ) {

            this.grid.southWest.y = []

            let g = this.createGroup('gridSouthEastY')

            let y = this.getHalfY()

            let counter = 0

            while (counter <= numberOfPointGroupsY) {

                let id = 'swy' + y

                this.grid.southWest.y.push(id)

                g.appendChild(
                    this.createLine(
                        id,
                        this.getHalfX() + '',
                        y + '',
                        this.getFullX() + '',
                        y + '',
                        'rgb(0,0,0)',
                        '1'
                    ))

                y += this.gapY

                counter++
            }

            this.layer.appendChild(g)
        }
    }

    drawSine() {

        let increment = 1

        let currentX = this.getHalfX()
        let currentY = this.getHalfY()

        let toX = 0
        let toY = 0

        let g = this.createGroup('sine')

        for (let index = 0; index <= 360;) {

            index += increment

            let rad = index * Math.PI / 180

            let y = Math.sin(rad)

            y *= 90

            toX = currentX + increment
            toY = this.getHalfY() + y

            g.appendChild(
                this.createLine(
                    'sineY' + y,
                    currentX + '',
                    currentY + '',
                    toX + '',
                    toY + '',
                    'rgb(255,100,255)',
                    '4'
                )
            )

            currentX = toX
            currentY = toY
        }

        this.layer.appendChild(g)
    }

    swapVariables() {

    }

    syncToBase() {

    }
}