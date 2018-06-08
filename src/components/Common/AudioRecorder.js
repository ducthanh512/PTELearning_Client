import React, { Component, Fragment } from 'react';

class AudioRecorder extends Component {
    constructor(props) {
        super(props);
        const { waitingTime } = this.props;
        this.state = {
            record: false,
            recordedBlob: '',
            stream: '',
            recorder: '',
            counter: 1,
            chunks: [],
            media: '',
            mediaOptions: {},
            duration: null,
            time: {},
            seconds: waitingTime,
            width: 0,

        }
        this.timer = 0;
        this.progressbarTimer = 0;
    };


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
    };


    startTimer = () => {
        if (this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    };


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
            this.prepareRecorder();

        }
    };

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        { this.startTimer() }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.currentQuestion !== nextProps.currentQuestion) {

            var { recorder, chunks, media, stream, counter, width } = this.state;
            clearInterval(this.timer);
            clearInterval(this.progressbarTimer);
                this.stopRecording();
            this.setState({
                seconds: nextProps.waitingTime,
                width: 0,
                recorder: '',
                record: false,
            recordedBlob: '',
            stream: '',
            recorder: '',
            counter: 1,
            chunks: [],
            media: '',
            mediaOptions: {},
            duration: null,
            })
            this.timer = 0;
            let timeLeftVar = this.secondsToTime(nextProps.waitingTime);
            this.setState({
                time: timeLeftVar
            })
            var elem = document.getElementById("myBar");
            elem.style.width = 0 + '%';
            var audio = document.getElementById('audio')
            while (audio.firstChild) {
                audio.removeChild(audio.firstChild);
            }
            
            { this.startTimer() }

        }
    }

    prepareRecorder = () => {
        this.progressBarMove();
        var { recorder, chunks, media, stream, counter } = this.state;
        var mediaOptions = {
            audio: {
                tag: 'audio',
                type: 'audio/ogg',
                ext: '.ogg',
                gUM: { audio: true }
            }
        };
        media = mediaOptions.audio;
        navigator.mediaDevices.getUserMedia(media.gUM).then(_stream => {
            stream = _stream;
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = e => {
                chunks.push(e.data);
                this.makeLink();
            };

            this.setState({
                recorder,
                media,
                chunks,
            },
                this.startRecording(recorder)
            );
        })
    };
    startRecording = (recorder) => {
        const { chunks } = this.state;
        recorder.start();
        this.setState({
            recorder,
        });
    };

    stopRecording = () => {
        const { recorder } = this.state;
        if (String(recorder.state) == "recording")
        recorder.stop();
        this.setState({
            recorder,
        });
    };


    makeLink = () => {
        var { counter, chunks, media,recorder, width } = this.state;
        var blob = new Blob(chunks, { type: media.type })
        var url = URL.createObjectURL(blob)
        var mt = document.createElement('audio')
        var audio = document.getElementById('audio')
        mt.controls = true;
        mt.src = url;
       if(width>=100)
        audio.appendChild(mt);
    };

    progressBarMove = () => {
        this.progressbarTimer = setInterval(this.frame, 100);
    };

    frame = () => {
        var elem = document.getElementById("myBar");
        let { width } = this.state;
        if (width >= 100) {
            clearInterval(this.progressbarTimer);
            this.stopRecording();
        } else {
            width++;
            if(elem) elem.style.width = width + '%';
            this.setState({
                width,
            })
        }
    }

    render() {
        const { width } = this.state;
        let emlTimer = this.state.time.s != 0
            ? <h5 className="card-title  text-left red_text_color">Beginning in  {this.state.time.s} seconds</h5>
            : <h5 className="card-title  text-left red_text_color">Recording </h5>
        if (width >= 100) { emlTimer = <h5 className="card-title  text-left red_text_color">Completed </h5> }
        return (
            <div className="card recoderChild ">
                <div className="card-body">
                    <h5 className="card-title text-center">Recorded Answer</h5>
                    <h5 className="card-text text-left">Current Status:</h5>
                    {emlTimer}
                    <div className="progress" style={{ height: '20px' }}>
                        <div id='myBar' className="progress-bar" role="progressbar" style={{ width:'0', height: '20px' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="recoderPlayBack" id='audio' />
                </div>
            </div>

        )
    }
}

export default AudioRecorder;