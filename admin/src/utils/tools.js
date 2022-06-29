
import JSEncrypt from 'jsencrypt'

// 加密
export function encrypt(publicKey, txt) {
	const encryptor = new JSEncrypt()
	encryptor.setPublicKey(publicKey) // 设置公钥
	return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}


// 回显数据字典
export function selectDictLabel(datas, value) {
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel);
			return true;
		}
	})
	return actions.join('');
}


// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
	if (!value) return '-'
	var actions = [];
	var currentSeparator = undefined === separator ? "," : separator;
	if (Array.isArray(value)) {
		Object.keys(value).some((val) => {
			Object.keys(datas).some((key) => {
				if (datas[key].dictValue == ('' + value[val])) {
					actions.push(datas[key].dictLabel + currentSeparator);
				}
			})
		})
	} else {
		var temp = value.split(currentSeparator);
		Object.keys(value.split(currentSeparator)).some((val) => {
			Object.keys(datas).some((key) => {
				if (datas[key].dictValue == ('' + temp[val])) {
					actions.push(datas[key].dictLabel + currentSeparator);
				}
			})
		})
	}

	return actions.join('').substring(0, actions.join('').length - 1);
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
	if (!str || str == "undefined" || str == "null") {
		return "";
	}
	return str;
}

// 过滤空字段
export function filtersObj(object) {
	let obj = {}
	for (const key in object) {
		if (Object.hasOwnProperty.call(object, key)) {
			if (object[key] || object[key] === 0) {
				if (Array.isArray(object[key])) {
					if (object[key].length) {
						obj[key] = object[key]
						continue;
					}
				}
				obj[key] = object[key]
			}
		}
	}
	return obj
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
	if (!data) {
		return []
	}
	let config = {
		id: id || 'id',
		parentId: parentId || 'parentId',
		childrenList: children || 'children'
	};

	var childrenListMap = {};
	var nodeIds = {};
	var tree = [];

	for (let d of data) {
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}

	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t);
	}

	function adaptToChildrenList(o) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]];
		}
		if (o[config.childrenList]) {
			for (let c of o[config.childrenList]) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}