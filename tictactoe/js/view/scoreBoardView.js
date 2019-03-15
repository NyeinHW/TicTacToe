const scoreBoardView = {
    init(controller){
        this.controller = controller;        
        this.scoreboard =  document.querySelector('#scoreboard ul');
        this.render();
    },
    render(){

        let position = 1;
        let previousCount = 0;
        this.scoreboard.innerHTML = "";
        this.winners = this.controller.getWinnerList();

        for(const winner of this.winners){
            const liEle = document.createElement('li');
            if (previousCount > winner.count) {
                position++;
            }
            previousCount = winner.count;
            const is_multiple = winner.count > 1 ? 's' : '';
            liEle.innerHTML = `
                <span class='font-weight-bold'>#${position}</span>
                <span>${winner.name}</span>
                <span class="text-right">(${winner.count} win${is_multiple})</span>`;
            liEle.classList.add('list-group-item');
            this.scoreboard.appendChild(liEle);
        }
    }

}

export default scoreBoardView;