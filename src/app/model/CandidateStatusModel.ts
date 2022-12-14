export class CandidateStatusModel {
    INPROGRESS: String
    DROPPED: String
    REMAPTORFP: String
    DELAY: String
    MOVETOCFP: String
    NOTSELECTEDTICFP: String
    NEW: String
    MOVETOBRP: String
    SELECTEDFORCFP:String
    constructor() {
        this.INPROGRESS = 'In Progress'
        this.DROPPED = 'Dropped'
        this.REMAPTORFP = 'Remap to other RFP Batch'
        this.DELAY = 'Delayed'
        this.MOVETOCFP = 'Moved to CFP'
        this.NOTSELECTEDTICFP = 'Not Selected for CFP'
        this.NEW = 'NEW'
        this.MOVETOBRP = 'Moved to BRP'
        this.SELECTEDFORCFP='Selected for CFP'
    }



}

export class BatchStatusModel {
    INPROGRESS: String
    HOLD: String
    TERMINATED: String
    COMPELTED: String

    constructor() {
        this.INPROGRESS = 'In Progress'
        this.HOLD = 'Hold'
        this.TERMINATED = 'Terminated'
        this.COMPELTED = 'Completed'


    }



}

export class StatusValue {

    NOTSLCTFFP: String

    INPROGRESS: String
    DROPPED: String
    REMAP: String
    SELECTCFP: String
    NEW: String
    MOVECFP: String
    DLYD: String
    MOVEBRP:String

    cfp: String
    rfp: String
    lfp: String

    cffp: String

    cfpf: String
    brp: String

    // CFPF:

    // CFFP

    // BRP





    // NOTSLCTFFP: "NOTSLCTCFP"

    // INPROGRESS: 'INPROGRESS'
    // DROPPED: 'DROPPED'
    // REMAP: 'REMAP'
    // SELECTCFP: 'SELECTCFP'
    // NEW: 'NEW'
    // MOVECFP: 'MOVECFP'
    // DLYD: 'DLYD'
    // NOTSLCTCFP: 'NOTSLCTCFP'
    constructor() {
        this.NOTSLCTFFP = "NOTSLCTCFP"
        this.INPROGRESS = 'INPROGRESS'
        this.DROPPED = 'DROPPED'
        this.REMAP = 'REMAP'
        this.SELECTCFP = 'SELECTCFP'
        this.NEW = 'NEW'
        this.MOVECFP = 'MOVECFP'
        this.DLYD = 'DLYD'
        this.MOVEBRP='MOVTOBRP'
        this.cfp = 'CFP'
        this.rfp = 'RFP'
        this.lfp = 'LFP'
        this.brp = 'BRP'
        this.cffp = 'CFFP'
        this.cfpf = 'CFPF'


    }
}