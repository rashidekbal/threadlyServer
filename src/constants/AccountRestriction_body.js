export default class AccountRestriction_body{
    type;
    reason;
    banTime;
    constructor(type,reason,banTime){
        this.type=type;
        this.reason=reason;
        this.banTime=banTime;

    }

}