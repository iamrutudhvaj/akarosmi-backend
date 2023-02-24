const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: 'dn5gf0c1a',
    api_key: '459454673519814',
    api_secret: 'vgx2Zh7S2K1zCs1y-G_eFs3Nr_E'
})

module.exports = cloudinary;