import { ComponentManager } from './ecs';

class BaseGameManager {
    constructor() {
        this.cm = new ComponentManager();
        this.gameState = 0; //bogus value
        this.animationCallbacks = new Map();
        this.services = new Map();
    }

    //Shortcuts so that app components do not need to
    //touch the component manager
    entity(id) {
        //return new Entity(id, this.cm);
        return this.cm.entity(id);
    }

    entities() {
        return this.cm.allEntities();
    }

    entitiesWith(cnames) {
        return this.cm.entitiesWith(cnames);
    }

    createEntity(id) {
        return this.cm.createEntity(id);
    }

    isDirty() {
        return this.cm.isDirty();
    }

    updateGameState(newState, payload) {
        this.gameState = newState;
        document.dispatchEvent(
            new CustomEvent(
                "game_state_changed", 
                { "detail": { state: newState, payload } }
            ));
    }

    update() {
        document.dispatchEvent(new CustomEvent("ecs_updated"));
    }

    addService(key, service) {
        service.parent = this;
        if(service.init) service.init(this);
        this.services.set(key, service);
    }

    service(key) {
        return this.services.get(key);
    }

    animate(id, animations, callback) {
        const animArray = Array.isArray(animations) ? animations : [animations];
        if(callback) this.animationCallbacks.set(id, callback);
        
        const e = this.cm.entity(id);
        const anim = e.animating;

        if(anim === undefined) {
            this.cm.addComponent(id, {cname:"animating", animations:animArray});
        } else {
            const current = anim.animations;
            animArray.forEach(aa => current.push(aa));
            e.edit("animating", {animations:current});
        }
    }

    removeAnimation(id) {
        const e = this.cm.entity(id);
        const anim = e.animating;
        anim.animations.shift();

        if(anim.animations.length === 0) {
            this.cm.removeComponentFrom(id, "animating");
            const callback = this.animationCallbacks.get(id);
            if(callback) {
                callback(e, this.cm);
            }
        }
    }

    terminateAnimation(id) {
        const entity = this.cm.entity(id);
        if(entity === undefined || entity.animating === undefined) return;

        const current = entity.animating.animations[0];
        
        current.complete(entity, this.cm);
        this.removeAnimation(entity.id);
    }

    runAnimations() {     
        const anim = this.cm.entitiesWith(["animating", "sprite"]);
        if(anim.length === 0) return;

        //console.time('update animations');
        anim.forEach(entity => {
            const current = entity.animating.animations[0];

            if(!current.initalized) {
                current.init(entity, this.cm, Date.now());
                current.initalized = true;
            }
            
            current.update(entity, this.cm, Date.now());

            if(current.done(entity, this.cm, Date.now())) {   
                current.complete(entity, this.cm);
                this.removeAnimation(entity.id);
            }
        });
        //console.timeEnd('update animations');
    }

}

export {BaseGameManager};