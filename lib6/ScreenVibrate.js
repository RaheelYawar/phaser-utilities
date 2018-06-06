export default class ScreenVibrate {
	/**
	 * @param {Object} game
	 * */
	constructor(game) {
		this.game = game;

		this.States = {
			NULL:	0,
			START:	1,
			IN_PROGRESS:	2,
			END:	3
		};

		this.DEFAULT_INTENSITY = 5;

		this.currentState = this.States.NULL;
		this.vibrateTime = 0;
		this.intensity = this.DEFAULT_INTENSITY;
	}

	/**
	 * This has to be called in an update function.
	 *
	 * @param {Number} dt Delta time.
	 * */
	updateRoutine(dt) {
		if (this.currentState === this.States.START) {
			this.game.world.setBounds(
				0, 0, this.game.width + this.intensity,
				this.game.height + this.intensity
			);
			this.currentState = this.States.IN_PROGRESS;
		} else if (this.currentState === this.States.IN_PROGRESS) {
			this.game.camera.x = 0;
			this.game.camera.y = 0;

			if (this.game.rnd.integerInRange(0, 1) === 0) {
				this.game.camera.x += this.game.rnd.integerInRange(0, this.intensity);
			} else {
				this.game.camera.x -= this.game.rnd.integerInRange(0, this.intensity);
			}
			if (this.game.rnd.integerInRange(0, 1) === 0) {
				this.game.camera.y += this.game.rnd.integerInRange(0, this.intensity);
			} else {
				this.game.camera.y -= this.game.rnd.integerInRange(0, this.intensity);
			}

			// Stop after duration passes
			if (this.vibrateTime > 0) {
				this.vibrateTime -= dt;
				if (this.vibrateTime <= 0) {
					this.game.camera.x = 0;
					this.game.camera.y = 0;
					this.currentState = this.States.END;
				}
			}
		} else if (this.currentState === this.States.END) {
			this.game.world.setBounds(0, 0, this.game.width, this.game.height);
			this.currentState = this.States.NULL;
		}
	}

	/**
	 * @param {Number} duration If <= 0, the vibration is continuous.
	 * @param {Number} [intensity=5]
	 * */
	startScreenVibration(duration, intensity = 5) {
		this.vibrateTime = duration;
		this.intensity = intensity;
		this.currentState = this.States.START;
	}

	/**
	 * Necessary if the vibration was continuous.
	 * */
	endScreenVibration() {
		this.currentState = this.States.END;
	}
}
