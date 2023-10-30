import JSEncrypt from 'jsencrypt'
import request from "@/utils/request";
import publicFn from "@/utils/publicFn";
import ENConfig from './../config/index'
import axios from 'axios'
import stroage from './stroage'
import {
	onMounted,
	reactive,
	ref,
	getCurrentInstance,
	toRefs,
	// useRouter,
	toRaw,
	computed,
	markRaw,
} from "vue";
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

export function GenerateColumList(state, columList) {
	const userInfo = stroage.getItem('userInfo');
	return Promise.allSettled(
		state.widgetForm.list.map(
			(item, index) =>
				new Promise((resolve, reject) => {
					if (item.type == "select" && item.options.remote) {
						axios(ENConfig.baseUrl + item.options.remoteFunc, {
							method: 'GET',
							cache: 'no-cache',
							headers: {
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + userInfo.token
							},
						})
							.then((res) => {
								console.log('axios=>', res)
								if (res.data instanceof Array) {
									item.options.remoteOptions = res.data.map((
										data
									) => {
										return {
											label: data[item.options.props.label],
											value: data[item.options.props.value],
											children: data[item.options.props.children],
										};
									});
								}
								resolve({
									prop: item.model,
									label: item.label,
									formatter(row, col, value) {
										let arr = toRaw(state.widgetForm.list[index])
											.options.remoteOptions;
										for (const key in arr) {
											if (Object.hasOwnProperty.call(arr, key)) {
												if (value == arr[key].value) {
													return arr[key].label;
												}
											}
										}
										return "";
									},
								});
							});
					} else if (item.type == "select" && !item.options.remote) {
						resolve({
							prop: item.model,
							label: item.label,
							formatter(row, col, value) {
								let arr = state.widgetForm.list[index].options.options
								for (const key in arr) {
									if (Object.hasOwnProperty.call(arr, key)) {
										if (value == arr[key].value) {
											return arr[key].label;
										}
									}
								}
								return "";
							}
						});
					} else if (item.type == "date") {
						resolve({
							prop: item.model,
							label: item.label,
							formatter(row, col, value) {
								return publicFn.formateDate(new Date(value), "yyyy-MM-dd");
							}
						});
					} else {
						resolve({
							prop: item.model,
							label: item.label,
						});
					}
				})
		)
	).then((res) => {
		columList.value = res.map((item) => item.value)
		columList.value = [...columList.value, {
			prop: "createTime",
			label: "创建时间",
			formatter(row, col, value) {
				return publicFn.formateDate(new Date(value));
			},
		}]

	});
}

export function antiShake(callback, dely) {
	let timer;
	let that = this
	return function () {
		if (timer) {
			// clearTimeout(timer)
			// timer = null
			// timer = setTimeout(() => {
			//     callback.call(that)
			//     clearTimeout(timer)
			//     timer = null
			// }, dely)
		} else {
			timer = setTimeout(() => {
				callback.call(that)
				clearTimeout(timer)
				timer = null
			}, dely)
		}
	}
}
export function handCopyText(text) {
	return new Promise((resolve, reject) => {
		const content = document.createElement("textarea");
		document.getElementsByTagName("body")[0].appendChild(content);
		content.value = text;
		content.select();
		document.execCommand("Copy");
		content.remove();
		resolve()
	})
}