import SvgIcon from "@/components/SvgIcon.vue"

export default  {
  install(app, options) {
    const requireAll = (requireContext) =>
      requireContext.keys().map(requireContext)
    const req = require.context("./", true, /\.svg$/)
    requireAll(req)
    app.component("svg-icon", SvgIcon)
  },
}
