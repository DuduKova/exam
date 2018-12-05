import React from 'react';

class App extends React.Component {

    state = {text: '', text2: ''};

    componentDidMount() {
        document.getElementById('phone').addEventListener('keydown', e => {
            this.keyPressed = e.keyCode;
        })
    }

    phoneFormat(phone) {
        this.currentCursorPos = phone.target.selectionStart;
        const numbers = phone.target.value.replace(/[^0-9]/g, '');
        this.setState({text2: this.countryCode + numbers});
        switch (numbers.length) {
            case 0:
                this.setState({text: '', text2: ''});
                break;
            case 1:
                this.setState({text: '(' + numbers + '  )'}, () => {
                    this.setCaretPosition('phone', this.keyPressed === 8 ? this.currentCursorPos : this.currentCursorPos + 1);
                });
                break;
            case 2:
                this.setState({text: '(' + numbers + ' )'}, () => {
                    this.setCaretPosition('phone', this.keyPressed === 8 ? this.currentCursorPos : this.currentCursorPos);
                });
                break;
            case 3:
                this.setState({text: '(' + numbers + ')'}, () => {
                    this.setCaretPosition('phone', this.keyPressed === 8 && this.currentCursorPos > 5  ? this.currentCursorPos - 2 : this.currentCursorPos);
                });
                break;
            case 4:
                this.setState({text: '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3)}, () => {
                    this.setCaretPosition('phone', this.keyPressed === 8 ? this.currentCursorPos : this.currentCursorPos + 2);
                });
                break;
            case 5:
                this.setState({text: '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3)}, () => {
                    this.setCaretPosition('phone', this.currentCursorPos);
                });
                break;
            case 6:
                this.setState({text: '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3)}, () => {
                    this.setCaretPosition('phone', this.currentCursorPos);
                });
                break;
            case 7:
                this.setState({text: '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3, 6) + '-' + numbers.slice(6)}, () => {
                    this.setCaretPosition('phone', this.keyPressed === 8 ? this.currentCursorPos : this.currentCursorPos + 1);
                });
                break;
            case 8:
                this.setState({text: '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3, 6) + '-' + numbers.slice(6)}, () => {
                    this.setCaretPosition('phone', this.currentCursorPos);
                });
                break;
            case 9:
                this.setState({text: '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3, 6) + '-' + numbers.slice(6)}, () => {
                    this.setCaretPosition('phone', this.currentCursorPos);
                });
                break;
            case 10:
                this.setState({text: '(' + numbers.slice(0, 3) + ') ' + numbers.slice(3, 6) + '-' + numbers.slice(6)}, () => {
                    this.setCaretPosition('phone', this.keyPressed === 8 ? this.currentCursorPos + 4 : this.currentCursorPos);
                });
                break;
            default:
                this.setState({text: numbers});
        }
    }

    setCaretPosition(elemId, caretPos) {
        const elem = document.getElementById(elemId);

        if (elem !== null) {
            if (elem.createTextRange) {
                const range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if (elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
    }

    checkInput(text) {
        const patt1 = /[a-zA-Z]+/g;
        const patt2 = /\s/g;
        const patt3 = /[^0-9]/g;
        const check = text.match(patt1);
        const check2 = text.match(patt2);
        const check3 = text.match(patt3);
        if (check3 !== null && text.length === 1) {
            return true;
        }
        if (check2 !== null) {
            return (check2.length > 2 || check !== null);
        }
        return (check !== null);
    }

    onInput = e => {

        if (this.checkInput(e.target.value)) {
            return;
        }

        this.phoneFormat(e);

    };

    style = {
        margin: 'auto',
        width: '200px',
        height: '30px',
        marginTop: '30px'
    };

    countryCode = '+1';
    currentCursorPos;
    keyPressed;

    render() {
        return (
            <div style={this.style}>
                <input style={this.style} type="tel" id="phone" name="phone"
                       placeholder="type phone number"
                       value={this.state.text} onInput={this.onInput}/><br />
                <input style={this.style} type="readonly" id="phone2" value={this.state.text2}/>
            </div>
        );
    }
}

export default App;
