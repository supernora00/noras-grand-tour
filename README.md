# Nora Journey OS · V5 Step 1

V5 的第一步：把 Archive 从静态页面改造成可维护的数据驱动模块。

## 已完成

- 新增 `data/archive.json`，统一保存 Europe 2026 的 21 天 Archive 数据。
- Archive 页面由 JavaScript 自动渲染，不再把内容写死在 HTML 中。
- 每一天可以编辑标题、日记、地点、花费与 Favorite。
- 内容自动保存在浏览器 `localStorage`。
- 支持导出完整 Archive JSON，方便下一阶段连接 GitHub/CMS。
- 手机端改为可横向滑动的 Day 列表。

## 本地预览

由于页面会读取 JSON，请不要直接双击 HTML。可在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000/archive.html`。

GitHub Pages 部署不受影响。

## 下一步

图片上传与 Gallery 数据结构；随后再接入真正的发布流程。
