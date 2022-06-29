import permisson from "./modules/permission"
import resize from "./modules/resize"
export default {
    install: (app) => {
        app.directive("permisson", permisson);
        app.directive("resize", resize);
    },
};
