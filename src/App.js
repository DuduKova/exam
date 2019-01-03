import React from 'react';

class App extends React.Component {

    state = {
        text: '',
        countryCode: '',
        currentCursorPos: 0,
        keyPressed: ''
    };

    phoneFormat(phone) {
        let cursorPosition = phone.target.selectionStart;
        const maxNumInPhone = 10;
        const numbers = phone.target.value.replace(/[^0-9]/g, '');
        const formattedText = `(${numbers.slice(0, 1)}${numbers.slice(1, 2) || ' '}${numbers.slice(2, 3) || ' '}) ${numbers.slice(3, 6)}${numbers.length > 6 ? '-' : ''}${numbers.slice(6)}`;
        const stayWithCursorInPlace = () => {
            this.setState({
                text: formattedText,
                currentCursorPos: cursorPosition,
                countryCode: '+1'
            }, () => {
                if (numbers.length === maxNumInPhone) {
                    return;
                }
                this.setCaretPosition('phone', this.state.currentCursorPos)
            });
        };

        if (numbers.length === 0) {
            return this.setState({
                countryCode: '',
                text: numbers
            })
        }
        if (numbers.length > maxNumInPhone) {
            return this.setState({text: numbers})
        } else {
            if (numbers.length > cursorPosition || this.state.keyPressed === 8) {
                return stayWithCursorInPlace();
            } else {
                if (numbers.length <= 3) {
                    cursorPosition = numbers.length + 1;
                    return stayWithCursorInPlace();
                } else {
                    return this.setState({
                        text: formattedText,
                        countryCode: '+1'
                    });
                }
            }
        }
    }

    setCaretPosition(elemId, caretPos) {
        const elem = document.getElementById(elemId);

        if (elem !== null) {
            if (elem.createTextRange) {
                const range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            } else {
                if (elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                } else
                    elem.focus();
            }
        }
    }

    checkInput(phone) {
        const patt1 = /[a-zA-Z]+/g;
        const patt2 = /\s/g;
        const patt3 = /[^0-9]/g;
        const check = phone.match(patt1);
        const check2 = phone.match(patt2);
        const check3 = phone.match(patt3);
        if (check3 !== null && phone.length === 1) {
            return true;
        }
        if (check2 !== null) {
            return (check2.length > 3 || check !== null);
        }
        return (check !== null);
    }

    onInput = e => {
        if (this.checkInput(e.target.value)) {
            return;
        }
        this.phoneFormat(e);
    };

    getKey = event => {
        this.setState({
            keyPressed: event.keyCode
        });
    };

    style = {
        margin: 'auto',
        width: '200px',
        height: '30px',
        marginTop: '30px'
    };

    render() {
        return (
            <div style={this.style}>
                <input style={this.style} type="text" id="phone" placeholder="type phone number"
                       value={this.state.text} onChange={this.onInput.bind(this)} onKeyDown={this.getKey}/><br/>
                <input style={this.style} type="readonly" id="phone2" onChange={this.onInput.bind(this)}
                       value={this.state.text.replace(/[^0-9]/g, '').replace('', this.state.countryCode)}/>
            </div>
        );
    }
}

export default App;
