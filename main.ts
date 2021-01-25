enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Guard = SpriteKind.create()
    export const light = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile28`, function (sprite, location) {
    agent14.ay = 0
    controller.moveSprite(agent14, 25, 50)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    isAgent14Hidden = true
    agent14.setImage(img`
        . c c c c c . 
        . c c c c c . 
        . c c c c c . 
        . c c c c c . 
        . c c c c c . 
        c c c c c c c 
        c c c c c c c 
        c c c c c c c 
        c c c c c c c 
        . c c . c c . 
        . c c . c c . 
        `)
    lantern.setLightBandWidth(10)
    controller.moveSprite(agent14, 0, 0)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (agent14.isHittingTile(CollisionDirection.Bottom) && isAgent14Hidden == false) {
        agent14.vy = -125
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.light, function (sprite, otherSprite) {
    lantern.startLanternEffect(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Guard, function (sprite, otherSprite) {
    if (isAgent14Hidden == false) {
        game.splash("You're caught!", "Try again")
        startLevel()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile29`, function (sprite, location) {
    agent14.ay = 0
    controller.moveSprite(agent14, 25, 50)
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    isAgent14Hidden = false
    agent14.setImage(img`
        . e e e e e 
        . e e d d d 
        . e d f d f 
        . d d d d d 
        . d d d d d 
        f f f 1 1 f 
        f f f f 1 f 
        f f f f f f 
        d f f f f f 
        . f f . f f 
        . e e . e e 
        `)
    lantern.setLightBandWidth(50)
    controller.moveSprite(agent14, 50, 0)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile10`, function (sprite, location) {
    currentLevel += 1
    startLevel()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile20`, function (sprite, location) {
    game.setDialogTextColor(7)
    if (game.askForString("PASSWORD_") == "Ag3NtS") {
        game.over(true, effects.dissolve)
    } else {
        game.over(false, effects.dissolve)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`transparency16`, function (sprite, location) {
    controller.moveSprite(agent14, 50, 0)
    agent14.ay = 200
})
function startLevel () {
    tiles.destroySpritesOfKind(SpriteKind.Guard)
    lantern.startLanternEffect(agent14)
    tiles.loadMap(levels[currentLevel])
    tiles.placeOnRandomTile(agent14, assets.tile`tile11`)
    lastDirection = "right"
    for (let value of tiles.getTilesByType(assets.tile`tile17`)) {
        droneGuard = sprites.create(img`
            ............55555555555............
            .........55555555555555555.........
            ........5555555555555555555........
            ......55555555555555555555555......
            .....5555555555555555555555555.....
            ....555555555555555555555555555....
            ...55555555555555555555555555555...
            ...55555555555555555555555555555...
            ..5555555555555555555555555555555..
            .555555555555555555555555555555555.
            .555555555555555555555555555555555.
            .555555555555555555555555555555555.
            55555555555555555555555555555555555
            55555555555555555555555555555555555
            55555555555555555555555555555555555
            55555555555555cccccc555555555555555
            5555555555555cdddbdbc55555555555555
            555555555555cdbbbbbbbc5555555555555
            5555555555555cbbbbbbc55555555555555
            55555555555555cccccc555555555555555
            55555555555555555555555555555555555
            55555555555555555555555555555555555
            55555555555555555555555555555555555
            .555555555555555555555555555555555.
            .555555555555555555555555555555555.
            .555555555555555555555555555555555.
            ..5555555555555555555555555555555..
            ...55555555555555555555555555555...
            ...55555555555555555555555555555...
            ....555555555555555555555555555....
            .....5555555555555555555555555.....
            ......55555555555555555555555......
            ........5555555555555555555........
            .........55555555555555555.........
            ............55555555555............
            `, SpriteKind.Guard)
        droneGuard.setFlag(SpriteFlag.BounceOnWall, true)
        if (randint(1, 2) == 1) {
            droneGuard.vx = 50
        } else {
            droneGuard.vx = -50
        }
        tiles.placeOnTile(droneGuard, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile18`)) {
        torch = sprites.create(img`
            . . 
            . . 
            `, SpriteKind.light)
        tiles.placeOnTile(torch, value)
    }
    if (currentLevel == 0) {
        game.splash("Oh no, Guards!", "Press B to hide.")
    } else if (currentLevel == 1) {
        game.splash("Don't fall!", "Press A to jump.")
    } else if (currentLevel == 2) {
        game.splash("That is a lot of guards", "They must know you are here!")
    } else if (currentLevel == 3) {
        game.splash("A wall of guards?", "They are crazy!")
    } else if (currentLevel == 4) {
        game.splash("You are close", "Hurry, quickly!")
    } else if (currentLevel == 5) {
        game.splash("Last room...", "Get to the computer to thwart Fischer Brown's attack")
    }
}
let torch: Sprite = null
let droneGuard: Sprite = null
let lastDirection = ""
let levels: tiles.WorldMap[] = []
let currentLevel = 0
let isAgent14Hidden = false
let agent14: Sprite = null
agent14 = sprites.create(img`
    . e e e e e 
    . e e d d d 
    . e d f d f 
    . d d d d d 
    . d d d d d 
    f f f 1 1 f 
    f f f f 1 f 
    f f f f f f 
    d f f f f f 
    . f f . f f 
    . e e . e e 
    `, SpriteKind.Player)
game.setDialogTextColor(1)
lantern.startLanternEffect(agent14)
lantern.setBreathingEnabled(true)
lantern.setLightBandWidth(20)
game.setDialogCursor(img`
    . e e e e e 
    . e e d d d 
    . e d f d f 
    . d d d d d 
    . d d d d d 
    f f f 1 1 f 
    f f f f 1 f 
    f f f f f f 
    d f f f f f 
    . f f . f f 
    . e e . e e 
    `)
isAgent14Hidden = false
controller.moveSprite(agent14, 50, 0)
agent14.ay = 200
scene.cameraFollowSprite(agent14)
currentLevel = 0
levels = [
tiles.createMap(tilemap`level1`),
tiles.createMap(tilemap`level2`),
tiles.createMap(tilemap`level3`),
tiles.createMap(tilemap`level4`),
tiles.createMap(tilemap`level5`),
tiles.createMap(tilemap`level6`)
]
startLevel()
forever(function () {
    if (agent14.bottom >= tiles.tilemapRows() * tiles.tileWidth()) {
        game.splash("Oh no!", "Try again")
        startLevel()
    }
})
forever(function () {
    if (isAgent14Hidden == false) {
        if (agent14.isHittingTile(CollisionDirection.Bottom) && controller.right.isPressed()) {
            lastDirection = "right"
            agent14.setImage(img`
                . e e e e e 
                . e e d d d 
                . e d f d f 
                . d d d d d 
                . d d d d d 
                f f f 1 1 f 
                f f f f 1 f 
                f f f f f f 
                d f f f f f 
                . f f . f f 
                . e e . e e 
                `)
        } else if (agent14.isHittingTile(CollisionDirection.Bottom) && controller.left.isPressed()) {
            lastDirection = "left"
            agent14.setImage(img`
                e e e e e . 
                d d d e e . 
                f d f d e . 
                d d d d d . 
                d d d d d . 
                f 1 1 f f f 
                f 1 f f f f 
                f f f f f f 
                f f f f f d 
                f f . f f . 
                e e . e e . 
                `)
        } else if (!(agent14.isHittingTile(CollisionDirection.Bottom)) && lastDirection == "right") {
            agent14.setImage(img`
                . e e e e e 
                . e e d d d 
                . e d f d f 
                . d d d d d 
                . d d d d d 
                f f f 1 1 f 
                f f f f 1 f 
                f f f f f f 
                d f f f f f 
                . f f . f f 
                e e . . e e 
                `)
        } else if (!(agent14.isHittingTile(CollisionDirection.Bottom)) && lastDirection == "left") {
            agent14.setImage(img`
                e e e e e . 
                d d d e e . 
                f d f d e . 
                d d d d d . 
                d d d d d . 
                f 1 1 f f f 
                f 1 f f f f 
                f f f f f f 
                f f f f f d 
                f f . f f . 
                e e . . e e 
                `)
        }
    }
})
