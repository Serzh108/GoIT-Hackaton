import { pathRenderName } from "@/constants/constants";

export const getPathRenderName = (path: string) => {
  const renderPath: string[] = [];

  path.split('/').map(pathItem => {
    if (pathRenderName[pathItem]) {
      renderPath.push(pathRenderName[pathItem]);
      return pathRenderName[pathItem];
    }
  });
  return renderPath;
};