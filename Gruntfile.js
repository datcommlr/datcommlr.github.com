module.exports = function(grunt) {
    vendor_scripts = [
        "bower_components/jquery/dist/jquery.min.js",
        "js/responsive-imagemaps.min.js",
        "bower_components/remodal/dist/remodal.min.js",
        "bower_components/headroom.js/dist/headroom.min.js",
        "bower_components/headroom.js/dist/jQuery.headroom.min.js",
        "bower_components/imagesloaded/imagesloaded.pkgd.min.js",
        "bower_components/masonry/dist/masonry.pkgd.min.js"
    ];

    grunt.initConfig({
      concat: {
        dist: {
          src: vendor_scripts,
          dest: 'js/vendors.js'
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);
}