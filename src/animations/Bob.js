import Slide from './Slide';

export default class Bob {
    constructor(from, to, speed) {
        this.slide = [];
        this.slide.push(new Slide(from, to, speed));
        this.slide.push(new Slide(to, from, speed));
        this.index = 0;

        this.current = () => this.slide[this.index];
    }

    init(entity, cm, time) {
        this.current().init(entity, cm, time);
    }

    update(entity, cm, time) {
        this.current().update(entity, cm, time);

        if(this.current().done(entity, cm, time)) {
            this.index = this.index === 0
                ? 1
                : 0;
        }
    }

    done(entity, cm, time) {
        return false;
    }

    complete(entity, cm) {
        //no op;
    }
}