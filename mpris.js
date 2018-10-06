// MPRIS "The Media Player Remote Interfacing Specification is a standard D-Bus interface which aims to provide a common programmatic API for controlling media players."
// https://specifications.freedesktop.org/mpris-spec/latest/

// https://www.npmjs.com/package/mpris-service
var Player = require('mpris-service')
var webview = document.getElementById('pcast')
var paused = true

var PocketcasterPlayer = Player({
    name: 'pocketcaster',
    identity: 'pocketcaster podcast player'
})

PocketcasterPlayer.playbackStatus = 'Paused'
PocketcasterPlayer.CanSeek = false

// Pause when receiving playppause message from DBUS
PocketcasterPlayer.on('playpause', function () {
    if (paused) {
        PocketcasterPlayer.playbackStatus = 'Playing'
        webview.send('media_play_pause')
        paused = false
    }
    else {
        PocketcasterPlayer.playbackStatus = 'Paused'
        webview.send('media_play_pause')
        var paused = true
    }
});

// Seek forward 30s when receiving next message from DBUS
PocketcasterPlayer.on('next', function () {
    webview.send('media_next')
})

// Seek back 15s when receiving previous message from DBUS
PocketcasterPlayer.on('previous', function () {
    webview.send('media_prev')
})