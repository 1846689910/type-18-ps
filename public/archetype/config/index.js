module.exports = {
  webpack: {
    enableShortenCSSNames: true,
    htmlWebpackPluginOptions: {
      unbundled: {
        pre: {
          js: ["<script type='text/javascript'>console.log('pre-js')</script>"]
        },
        post: {
          js: ["<script type='text/javascript'>console.log('post-js')</script>"]
        }
      }
    }
  },
  babel: {
    enableTypeScript: true
  }
};