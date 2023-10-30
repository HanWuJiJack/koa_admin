// 直接导出文件
import ExportJsonExcel from "js-export-excel"
import JSZip from "jszip"

// 参考参数
// const datas = [
//     {
//         dict: [
//             {
//                 key: "第一列",
//                 val: "name"
//             }
//             ,
//             {
//                 key: "第二列",
//                 val: "sex"
//             }
//         ],
//         source: [{ name: '小明', sex: '0' }, { name: '小明2', sex: '1' }]
//     }
// ]

export default function ({ datas, XFileName, ZFileName, isZip = false }) {
    var option = {};
    option.fileName = XFileName;
    option.saveAsBlob = true;
    option.datas = datas.map((item) => {
        item.sheetData = item.source.map((cur) => {
            return item.dict.map((current) => {
                return cur[current.val]
            })
        })
        item.sheetHeader = item.dict.map(item => item.key)
        return item
    });
    // option.datas = [
    //     {
    //         sheetData: [
    //             ["一行一列", "一行二列"],
    //             ["一行一列", "一行二列"],
    //         ],
    //         sheetName: "sheet",
    //         sheetHeader: ["第一列", "第二列"],
    //         columnWidths: [20, 20],
    //     },
    // ];
    var toExcel = new ExportJsonExcel(option); //new
    let file = toExcel.saveExcel()
    if (!isZip) {
        const aLink = document.createElement('a')
        aLink.style.display = 'none'
        aLink.href = URL.createObjectURL(new Blob([file]))
        aLink.setAttribute('download', XFileName + '.xlsx') // 设置下载文件名称
        document.body.appendChild(aLink)
        aLink.click()
        URL.revokeObjectURL(aLink.href);//清除引用
        document.body.removeChild(aLink);
    } else {
        // 压缩文件
        var zip = new JSZip();
        // 多个excel 依次加入(fileName不能相同)
        zip.file(file.name, file);
        zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, ZFileName || Date.now() + ".zip"); // 下载文件
        });
    }
}
