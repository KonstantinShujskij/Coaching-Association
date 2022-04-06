// Одно из требований к имени - уникальность, по этому имя используеться в качестве Id

// Функция возвращает id всех тренеров 
export function getTrenersId(treners) {
    let ternersId = [];

    treners.forEach((trener) => {
        ternersId.push(trener.name);
        if(trener.childs.length) {
            ternersId = ternersId.concat(getTrenersId(trener.childs));
        }
    });

    return ternersId;
}

// Функция возвращает общие количество тренеров
export function getCount(treners) {
    return getTrenersId(treners).length;
}

// Функция рекурсивно проходит по всем тренерам и возвращает такойже массив, но с 
// применённым коллбэком к каждому тренеру 
export function iterateTreners(treners, {...args}, callback) {
    const newTreners = [];

    treners.forEach((trener) => {
        const newTrener = {...trener, childs: []};

        if(trener.childs.length) {
            newTrener.childs = iterateTreners(trener.childs, args, callback);
        }

        newTreners.push(callback(newTrener));
    });

    return newTreners;
}

// Функция возвращает глубокую копию массива тренеров 
export function copyTreners(treners) {
    const newTreners = iterateTreners(treners, {}, (newTrener) => newTrener);
    return newTreners;
}

// Функция возвращает глубокую копию массива тренеров добавив указоному родителю указаного тренера
export function addTrener(treners, insertTrener, parent) {
    const newTreners = iterateTreners(treners, {insertTrener, parent}, (newTrener) => {
        if(newTrener.name === parent) {
            newTrener.childs.push(insertTrener);
        }
        return newTrener;
    });

    return newTreners;
}

// Функция возвращает глубокую копию массива тренеров удалив указаного тренера и присвоев
// его "детей" родителю
export function deleteTrener(treners, trenerId) {
    let newTreners = [];

    treners.forEach((trener) => {
        const newTrener = {...trener, childs: []};

        if(trener.name === trenerId) {
            newTreners = newTreners.concat(copyTreners(trener.childs))
        }
        else {
            if(trener.childs.length) {
                newTrener.childs = deleteTrener(trener.childs, trenerId);
            }
            newTreners.push(newTrener);
        }

    });

    return newTreners;
}

// Функция возвращает глубокую копию массива тренеров передвинув указаного тренера 
// между сестринскими элементами на указанное смещение
export function insertTrener(treners, trenerId, shift) {
    const newTreners = [];
    let selectTrener = undefined;
    let selectIndex = undefined;

    treners.forEach((trener, index) => {
        const newTrener = {...trener, childs: []};

        if(trener.childs.length) {
            newTrener.childs = insertTrener(trener.childs, trenerId, shift);
        }

        if(trener.name === trenerId) {
            selectTrener = newTrener;
            selectIndex = index;
        }
        else {
            newTreners.push(newTrener);
        }        
    });

    if(selectTrener) {
        newTreners.splice(selectIndex + shift, 0, selectTrener);
    }

    return newTreners;
}

// Функция проверяет является ли указанный "ребенок" потомком указаного "родителя"
// в любом поколении 
export function isDeepChild(treners, childId, parentId, isParent=false) {
    for(let trener of treners) {
        if(trener.name === childId) { return isParent; }
        if(trener.name === parentId) { return isDeepChild(trener.childs, childId, parentId, true); }

        if(trener.childs.length) {
            if(isDeepChild(trener.childs, childId, parentId, isParent)) { return true; }
        }
    }

    return false;
}

// Функция проверяет является ли указанный "родитель" прямым родителем указаного ребенка
export function isParent(parent, childId) {
    if(parent.childs) {
        for(let child of parent.childs) {
            if(child.name === childId) { return true; }
        }
    }
    return false;
}

// Функция возвращает глубокую копию массива тренеров удалив указаного тренера и всех его потомков
export function deepDeleteTrener(treners, trenerId) {
    let newTreners = [];

    treners.forEach((trener) => {
        const newTrener = {...trener, childs: []};

        if(trener.name !== trenerId) {
            if(trener.childs.length) {
                newTrener.childs = deepDeleteTrener(trener.childs, trenerId);
            }
            newTreners.push(newTrener);
        }

    });

    return newTreners;
}