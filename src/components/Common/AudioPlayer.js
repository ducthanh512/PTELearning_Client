import React, { Component } from 'react';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    //const { waitingTime } = this.props;
    this.state = {
      duration: null,
      time: {},
      seconds: this.props.waitingTime,
      media: this.props.media,
      autoplay: true,
      currentQuestion: this.props.currentQuestion,
      isAudioEnd :false,
    }

    this.timer = 0;

  }


  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }


  startTimer = () => {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }


  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);

     if(this.audio) this.audio.play().catch(e => {
        this.setState({
          autoplay: false,
        })
        alert('Autoplay is stop by new Chrome`s autoplay policies');
      });

    }
  }

  componentDidMount() {
    //console.log('componentDidMount');
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    { this.startTimer() }

    var audio = document.getElementById("myAudio");
    audio.onended = function () {
     // alert("audio playback has ended");
    };

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentQuestion !== nextProps.currentQuestion) {
      clearInterval(this.timer);
      this.setState({
        media: nextProps.media,
        seconds: nextProps.waitingTime,
      })
      this.timer = 0;
      let timeLeftVar = this.secondsToTime(nextProps.waitingTime);
      this.setState({
        time: timeLeftVar
      })
      { this.startTimer() }

    }
  }

  render() {



    const { autoplay } = this.state;
    const { media } = this.props;
    let src = media;
    // src = "https://pte-practice.com/Audio/Annotation/pte.jpg/pte.mp3/172e198d-9cb6-e611-80f3-1458d05a586c?1528247368325";

    let emlTimer = this.state.time.s != 0
      ? <h5 className="card-title  text-center red_text_color">Beginning in  {this.state.time.s} </h5>
      : <h5 className="card-title  text-center red_text_color">Started </h5>

    if (this.state.time.s == 0 && !autoplay) {
      emlTimer = <h5 className="card-title  text-center red_text_color">Please click play button </h5>
    }
    const { isWider } = this.props;
    const classStyle = isWider ? "card audio_player recoderChild" : "card audio_player"
    return (
      <div className={classStyle}>
        <div className="card-header deep-orange lighten-1 white-text lead audio_player_header">Audio player</div>
        <div className="card-body">
          {emlTimer}
        </div>
        <audio id="myAudio" controls ref={(audio) => { this.audio = audio }} src={src} />
      </div>

    );

  }
}

export default AudioPlayer;