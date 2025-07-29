import { type RouteConfig, index, layout , route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("layout/layout.tsx",[
        route("home","pages/home/home.tsx"),
        route("articles","pages/articles/outview.tsx"),
        route("about","pages/about/about.tsx")
    ]),
] satisfies RouteConfig;
 