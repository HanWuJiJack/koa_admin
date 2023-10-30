import JSZipUtils from "jszip-utils";
import docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import PizZip from "pizzip";
import ENConfig from './../config/index'
export default (temUrl, docxData, fileName) => {
    // 读取并获得模板文件的二进制内容
    JSZipUtils.getBinaryContent(
        `${ENConfig.wordTemUrl}${temUrl}`,
        function (error, content) {
            // 抛出异常
            if (error) {
                throw error;
            }
            // 创建一个PizZip实例，内容为模板的内容
            let zip = new PizZip(content);
            // 创建并加载docxtemplater实例对象
            let doc = new docxtemplater().loadZip(zip);
            // 去除未定义值所显示的undefined
            doc.setOptions({
                nullGetter: function () {
                    return "";
                }
            }); // 设置角度解析器
            // 设置模板变量的值，对象的键需要和模板上的变量名一致，值就是你要放在模板上的值

            doc.setData({
                ...docxData,
            });

            try {
                // 用模板变量的值替换所有模板变量
                doc.render();
            } catch (error) {
                // 抛出异常
                let e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                };
                console.log(JSON.stringify({ error: e }));
                throw error;
            }

            // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
            let out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            // 将目标文件对象保存为目标类型的文件，并命名
            saveAs(out, fileName);
        }
    );
}
