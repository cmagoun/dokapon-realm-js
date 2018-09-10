import {ComponentManager, ComponentIndex} from './ecs';

it('adds entity and gets id back', () => {
    const cm = new ComponentManager();

    const e = cm.createEntity();

    expect(e.id).toHaveLength(36);
    expect(Array.from(cm.etoc.get(e.id).keys())).toEqual([]);
});

it('adds entity with existing id', () => {
    const cm = new ComponentManager();

    const e = cm.createEntity('xyz');

    expect(e.id).toHaveLength(3);
    expect(Array.from(cm.etoc.get('xyz').keys())).toEqual([]);
});

it('adds component to an entity', () => {
    const cm = new ComponentManager();

    const e = cm.createEntity();
    e.add({cname:"test", msg:"Hello World"});

    //checking the cm internal maps to be sure they are correct
    expect(cm.etoc.get(e.id).get("test")).toBe(1);
    expect(cm.ctoe.get("test").get(e.id)).toBe(1);
    expect(cm.component(e.id, "test").msg).toBe("Hello World");
});

it('removes component from an entity', () => {
    const cm = new ComponentManager();

    const e = cm.createEntity();
    e.add({cname:"test", msg:"Hello World"});
    e.add({cname:"gone", test:1, msg:"I am gone"});

    const before = e.read().gone;
    expect(before.msg).toBe("I am gone");

    e.remove("gone");
    const after = e.read().gone;
    expect(after).toEqual(undefined);

    expect(cm.etoc.get(e.id).get("test")).toBe(1);
    expect(cm.ctoe.get("test").get(e.id)).toBe(1);
    expect(cm.ctoe.get("gone").get(e.id)).toBe(undefined);
})

it('can return entity as object', () => {
    const cm = new ComponentManager();

    const e = cm.createEntity("test");
    e.add({cname: "name", first:"Testy", last:"McTester"});
    e.add({cname: "age", value:47});
    e.add({cname: "scores", jan:10, feb:20, mar:30})

    const obj = e.read();
    expect(obj.name.first).toBe("Testy");
    expect(obj.scores.jan).toBe(10);
})

it('can edit component data', () => {
    const cm = new ComponentManager();

    cm.createEntity("test");
    cm.addComponentTo("test", "name", {first:"Testy", last:"McTester"});

    cm.editComponentOf("test", "name", {first:"cheese"});

    const obj = cm.entity("test");
    expect(obj.name.first).toBe("cheese");
    expect(obj.name.last).toBe("McTester");
})

it('can addComponent without cname', () => {
    const cm = new ComponentManager();

    cm.createEntity("test");
    cm.addComponent("test", {cname:"name", first:"Testy", last:"McTester"});

    const obj = cm.entity("test");
    expect(obj.name.first).toBe("Testy");
})

it('can find entities with x component', () => {
    const cm = new ComponentManager();

    cm.createEntity("withx");
    cm.addComponent("withx", {cname:"x"});

    cm.createEntity("withxalso");
    cm.addComponent("withxalso", {cname:"x"});

    cm.createEntity("nox");
    cm.addComponent("nox", {cname:"y"});

    const result = cm.entitiesWith("x");
    expect(result.length).toBe(2);
})

it('can get all entities', () => {
    const cm = new ComponentManager();

    cm.createEntity("withx");
    cm.addComponent("withx", {cname:"x"});

    cm.createEntity("withxalso");
    cm.addComponent("withxalso", {cname:"x"});

    cm.createEntity("nox");
    cm.addComponent("nox", {cname:"y", value:100});

    const result = cm.allEntities();
    expect(result.length).toBe(3);
    expect(result[2].y.value).toBe(100);
    
})

it('can set values in ComponentIndex', () => {
    const ci = new ComponentIndex("test", "pos", pos => `${pos.vec.x},${pos.vec.y}`);
    const pos1 = {vec:{x:10, y:10}};
    const pos2 = {vec:{x:20, y:20}};

    ci.set(pos1, "player");
    ci.set(pos2, "enemy");

    const result = ci.get({vec:{x:10, y:10}});

    expect(result.length).toBe(1);
    expect(result[0]).toBe("player");
})

it('can remove values in ComponentIndex', () => {
    const ci = new ComponentIndex("test", "pos", pos => `${pos.vec.x},${pos.vec.y}`);
    const pos1 = {vec:{x:10, y:10}};

    ci.set(pos1, "player");
    ci.set(pos1, "enemy");

    const result = ci.get({vec:{x:10, y:10}});
    expect(result.length).toBe(2);
    expect(result).toEqual(["player", "enemy"]);

    ci.remove(pos1, "player");
    
    const result2 = ci.get(pos1);
    expect(result2.length).toBe(1);
    expect(result2[0]).toBe("enemy");
})

it('can get by key in ComponentIndex', () => {
    const ci = new ComponentIndex("test", "pos", pos => `${pos.vec.x},${pos.vec.y}`);
    const pos1 = {vec:{x:10, y:10}};
    const pos2 = {vec:{x:20, y:20}};

    ci.set(pos1, "player");
    ci.set(pos2, "enemy");

    const result = ci.getByKey("20,20");
    expect(result.length).toBe(1);
    expect(result[0]).toBe("enemy");
})

it('can create indexes in ComponentManager', () => {
    const cm = new ComponentManager();

    const e1 = cm.createEntity("e1")
        .add({cname:"pos", vec:{x:1, y:1}});

    const i1 = cm.createEntity("i1")
        .add({cname:"pos", vec:{x:1, y:1}});

    const e2 = cm.createEntity("e2")
        .add({cname:"pos", vec:{x:2, y:2}});

    const e3 = cm.createEntity("e3")
        .add({cname:"pos", vec:{x:3, y:3}});

    cm.createIndex("test", "pos", pos => `${pos.vec.x},${pos.vec.y}`);

    const result = cm.entitiesIn("test", "3,3");
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("e3");

    const result2 = cm.entitiesIn("test", "1,1");
    expect(result2.length).toBe(2);
    expect(result2[0].id).toBe("e1");
    expect(result2[1].id).toBe("i1");
})

it('can find similar entities', () => {
    const cm = new ComponentManager();

    const e1 = cm.createEntity("e1")
        .add({cname:"pos", vec:{x:1, y:1}});

    const i1 = cm.createEntity("i1")
        .add({cname:"pos", vec:{x:1, y:1}});

    const e2 = cm.createEntity("e2")
        .add({cname:"pos", vec:{x:2, y:2}});

    const e3 = cm.createEntity("e3")
        .add({cname:"pos", vec:{x:3, y:3}});

    cm.createIndex("test", "pos", pos => `${pos.vec.x},${pos.vec.y}`);

    const result = cm.entitiesSimilar("test", e1.read());
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("i1");
})

// it('entitiesWith speed test', () => {
//     const num = 10000;
//     const cm = new ComponentManager();
    

//     for(let x = 0; x < num; x++) {
//         cm.createEntity("entity_" + x)
//             .add({cname: "A", value: "a"})
//             .add({cname: "B", value: "b"})
//             .add({cname: "C", value: 100})
//             .add({cname: "D", value: 100})
//             .add({cname: "E", value: 100})
//             .add({cname: "F", value: 100})
//             .add({cname: "G", value: 100})
//             .add({cname: "H", value: 100});
//     }

//     console.time('entities');
//     let i = 1;
//     while(i--) {
//         cm.entitiesWith("A");
//         cm.entitiesWith(["A", "B"]);
//         cm.entitiesWith(["A", "E", "H"]);
//         cm.entitiesWith(["B", "C", "D", "E"]);
//         cm.entitiesWith(["H", "G", "A", "C", "B"]); 
//     }

//     console.timeEnd("entities");
// })

// it('speed test', () => {
//     const num = 100;
//     const cm = new ComponentManager();
//     console.time('someFunction');

//     console.time('create');
//     for(let x = 0; x < num; x++) {
//         cm.createEntity("entity_" + x)
//             .add({cname: "A", value: "a"})
//             .add({cname: "B", value: "b"})
//             .add({cname: "C", value: 100})
//             .add({cname: "D", value: 100})
//             .add({cname: "E", value: 100})
//             .add({cname: "F", value: 100})
//             .add({cname: "G", value: 100})
//             .add({cname: "H", value: 100});
//     }
//     console.timeEnd('create');
    
//     console.time('read and edit');
//     for(let x = 0; x < num; x++) {
//         const e = cm.entity("entity_" + x);
//         let test = `${e.A},${e.B},${e.C}`;
//         e.edit("A", {value:"aaa"});
//     }
//     console.timeEnd('read and edit');


//     console.time('delete');
//     for(let x = 0; x < num; x++) {
//         const e = cm.entity("entity_" + x);
//         e.destroy();
//     }
//     console.timeEnd('delete');

//     console.timeEnd('someFunction');
    
// })

