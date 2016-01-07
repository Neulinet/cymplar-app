export class ObjectUtil {

	private static _seq = 0;

	static nextId() {
		return `${++ObjectUtil._seq}`;
	}

	static clone(data: any): any {
		return JSON.parse(JSON.stringify(data));
	}

	static merge(dest: Object, src: Object) {
		if (ObjectUtil.isBlank(src)) {
			return dest;
		}
		if (ObjectUtil.isBlank(dest)) {
			return src;
		}
		for (let prop in src) {
			dest[prop] = src[prop];
		}
	}

	static isPresent(data: any): boolean {
		return !ObjectUtil.isBlank(data);
	}

	static isBlank(data: any): boolean {
		return data === undefined || data === null;
	}

	static createFilter(data = {}, regExp = true): any {
		
		//TODO Consult if it should be moved to the server folder in order to use mongoose types
		const regObjId = new RegExp('^[0-9a-fA-F]{24}$');
		let filters = {};
		
		// Regular expresion to simplify the search
		for (const entry in data) {
<<<<<<< HEAD
			if (ObjectUtil.isPresent(data[entry])) {
				if (regExp && typeof data[entry] === 'string' && !regObjId.test(data[entry])) {
=======
		    if (ObjectUtil.isPresent(data[entry]) && entry !== 'ido' && entry !== 'idl') {
		    	if (regExp && typeof data[entry] === 'string' && !regObjId.test(data[entry])) {
>>>>>>> a4b80a08563f6eda020f1ed206f5605c7a55d159
					filters[entry] = new RegExp(data[entry], 'i');
				} else {
					filters[entry] = data[entry];
				}
			}
		}
		
		return filters;
	}

}

