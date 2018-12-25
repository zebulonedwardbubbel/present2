/* eslint-disable block-scoped-var */
/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
function snow() {
    // The star of every good animation
    const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

    const transforms = [
        'transform',
        'msTransform',
        'webkitTransform',
        'mozTransform',
        'oTransform'
    ];


    // Array to store our Snowflake objects
    const snowflakes = [];

    // Global variables to store our browser's window size
    let browserWidth;
    let browserHeight;

    // Specify the number of snowflakes you want visible
    const numberOfSnowflakes = 50;

    // Flag to reset the position of the snowflakes
    let resetPosition = false;

    //
    // It all starts here...
    //
    function setup() {
        window.addEventListener('DOMContentLoaded', generateSnowflakes, false);
        window.addEventListener('resize', setResetFlag, false);
    }
    setup();

    //
    // Vendor prefix management
    //
    function getSupportedPropertyName(properties) {
        for (let i = 0; i < properties.length; i++) {
            if (typeof document.body.style[properties[i]] !== 'undefined') {
                return properties[i];
            }
        }
        return null;
    }
    const transformProperty = getSupportedPropertyName(transforms);

    //
    // Constructor for our Snowflake object
    //
    function Snowflake(element, radius, speed, xPos, yPos) {
    // set initial snowflake properties
        this.element = element;
        this.radius = radius;
        this.speed = speed;
        this.xPos = xPos;
        this.yPos = yPos;

        // declare variables used for snowflake's motion
        this.counter = 0;
        this.sign = Math.random() < 0.5 ? 1 : -1;

        // setting an initial opacity and size for our snowflake
        this.element.style.opacity = 0.1 + Math.random();
        this.element.style.fontSize = `${12 + Math.random() * 50}px`;
    }

    //
    // The function responsible for actually moving our snowflake
    //
    Snowflake.prototype.update = function() {
    // using some trigonometry to determine our x and y position
        this.counter += this.speed / 5000;
        this.xPos += (this.sign * this.speed * Math.cos(this.counter)) / 40;
        this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;

        // setting our snowflake's position
        setTranslate3DTransform(
            this.element,
            Math.round(this.xPos),
            Math.round(this.yPos)
        );

        // if snowflake goes below the browser window, move it back to the top
        if (this.yPos > browserHeight) {
            this.yPos = -50;
        }
    };

    //
    // A performant way to set your snowflake's position
    //
    function setTranslate3DTransform(element, xPosition, yPosition) {
        // eslint-disable-next-line template-curly-spacing
        const val = `translate3d(${xPosition}px, ${yPosition}px` + ', 0)';
        element.style[transformProperty] = val;
    }

    //
    // The function responsible for creating the snowflake
    //
    function generateSnowflakes() {
    // get our snowflake element from the DOM and store it
        const originalSnowflake = document.querySelector('.snowflake');

        // access our snowflake element's parent container
        const snowflakeContainer = originalSnowflake.parentNode;

        // get our browser's size
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;

        // create each individual snowflake
        for (let i = 0; i < numberOfSnowflakes; i++) {
            // clone our original snowflake and add it to snowflakeContainer
            const snowflakeCopy = originalSnowflake.cloneNode(true);
            snowflakeContainer.appendChild(snowflakeCopy);

            // set our snowflake's initial position and related properties
            const initialXPos = getPosition(50, browserWidth);
            const initialYPos = getPosition(50, browserHeight);
            const speed = 5 + Math.random() * 40;
            const radius = 4 + Math.random() * 10;

            // create our Snowflake object
            const snowflakeObject = new Snowflake(
                snowflakeCopy,
                radius,
                speed,
                initialXPos,
                initialYPos
            );
            snowflakes.push(snowflakeObject);
        }

        // remove the original snowflake because we no longer need it visible
        snowflakeContainer.removeChild(originalSnowflake);

        // call the moveSnowflakes function every 30 milliseconds
        moveSnowflakes();
    }

    //
    // Responsible for moving each snowflake by calling its update function
    //
    function moveSnowflakes() {
        // eslint-disable-next-line block-scoped-var
        for (var i = 0; i < snowflakes.length; i++) {
            const snowflake = snowflakes[i];
            snowflake.update();
        }

        // Reset the position of all the snowflakes to a new value
        if (resetPosition) {
            browserWidth = document.documentElement.clientWidth;
            browserHeight = document.documentElement.clientHeight;

            // eslint-disable-next-line no-redeclare
            for (var i = 0; i < snowflakes.length; i++) {
                var snowflake = snowflakes[i];

                snowflake.xPos = getPosition(50, browserWidth);
                snowflake.yPos = getPosition(50, browserHeight);
            }

            resetPosition = false;
        }

        requestAnimationFrame(moveSnowflakes);
    }

    //
    // This function returns a number between (maximum - offset) and (maximum + offset)
    //
    function getPosition(offset, size) {
        return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
    }

    //
    // Trigger a reset of all the snowflakes' positions
    //
    function setResetFlag(e) {
        resetPosition = true;
    }
}

export default snow;
