// #region Home Screen

    // #region App Navigation

    export const DashboardScreen  = 'mainDashboard';
    export const LoginScreen  = 'Login';
    export const ForgetScreen  = 'ForgetScreen';
    export const PulseScreen  = 'pulseMain';
    export const DealerCommissionsScreen  = 'dealerCommissionMain';
    export const AnalyticsScreen  = 'DealerAnalytics';
    export const InvoiceScreen  = 'DealerInvoice'
// #endregion

// #region Main Dashboard

    export const DashboardError = 'Error Retrieving Username:';
    export const Error = 'Error Retrieving Features Information:';
    export const TermsURL = 'https://pulse.bundledealer.com/TermsOfUse#no-back';
    export const PolicyURL = 'https://www.ibex.co/privacy-policy';
    export const AppFeatures = {
        Pulse: 'Pulse',
        Finance:{
            DealerCommissions: 'Dealer Commissions'
        }, 
    }
    export const TestRole = "TestUser";

// #endregion

// #endregion

// #region Login Modules

// #region Login Screen

    export const LoginError = {
        TokenCheckingError : 'Error checking existing item:',
        TokenRemovingError : 'Error removing existing item:',
        InvalidCredentials : 'Invalid Credentials.',
        EmailPasswordError : 'Email and Password are Required.',
        ServerExceptionError : 'Server not responding. Please Try Again Later!',
        EmailError : 'Invalid Email Address.',
        PasswordErrorShort : 'Password must be At Least 8 Characters Long.',
        PasswordErrorLong : 'Password should not exceed 20 Characters.',
        ErrorWritingFile : 'Error writing access token to file:',
    }

    export const Username = 'Username';
    export const SessionID = 'SessionID';
// #endregion

// #endregion


// #region Reporting

// #region PULSE

    export const ThresholdDuration = '00:00:00';
    export const PulseParams = {
        DefaultSkill : 'OVERALL',
        DefaultHour : 12
    }
    export const CancelRequest = "Cancelling previous request";
    export const PulseCenter = {
        Default: 'All',
        Core: 'DGS',
        Dealers: 'DEALERS'
    }
    export const AgentActivity = {
        Login: 'TotalLogin',
        Busy: 'Busy',
        Break: 'OnBreak',
        Wrap: 'OnWrap',
        Wait: 'Wait',
        Coaching: 'Coaching',
        Training: 'Training',
        AgentLogin: 'Login',
        OnBreak: 'Break',
        OnWrap: 'Wrap'
    }
    export const PulseTab = {
        Summary: 'Summary',
        HourlySkills: 'Hourly_Skills'
    }
    export const Animation = {
        iteration: "infinite",
        type: 'pulse'
    }
    export const Pulse_CallsStats = {
        Initiated: "Initiated",
        Answered: "Answered",
        AbandonsDuration: "Abandons Duration",
        ShortAbandons: "Short Abandons",
        FatalCalls: "Fatal Calls",
        RepeatCalls: "Repeat Calls",
        IVRHangups: "IVR Hangups"
    }
    export const Pulse_SalesStats = {
        SalesDetails: "Sales Details",
        UtilityProducts: "Utility Products",
        Qualifications: "Qualifications",
        Optins: "Optins",
        OutboundRGUs: "Outbound RGUs",
        Addons: "Addons",
    }
    export const AgentStatus = { 
        Login: 'LOGGED IN',
        Logout: 'LOGGED OUT',
    };
// #endregion

// #region Finances

    // #region Dealer Commmissions

    export const InvoiceStatus = { 
        Approved: 'Approved',
        Pending: 'Pending',
        Submitted: 'Submitted',
        SelectStatus: 'Select Status',
        NULL: 'null'
    };
    export const InvoiceError = { 
        InvalidDate: 'Invalid Date Selection',
        NoDealer: 'No Dealer Selected',
        NoStatus: 'No Status Selected'
    };
    export const SelectDealer = 'Select Dealers'
    export const FamilyFont = 'Poppins-Regular'
    // #endregion


// #endregion

// #endregion

// #region Authentication APIs

export const Authentication = 'Authentication';
export const VerifyAuthentication = 'VerifyUserAuthentication'
export const UpdateSession = 'UpdateUserSession'
export const VerifyMacAddress = 'VerifyUserMacAddress'
export const Devices = { 
    IOS: 'ios',
    Android: 'android',
};

// #endregion

// #region Reporting APIs

export const Reporting = 'Reporting';
export const AgentLogs = 'BD_Pulse_GetAgentsLogs';
export const WaitCalls = 'BD_Pulse_WaitCallData';
export const Pulse_DashboardData = 'Pulse'

export const DealerCommissions = {
    ApprovedInvoice: 'DealerCommissions',
    DealerDD: 'BD_Commissions_DDL',
    PreviousInvoice: 'BD_Commissions_GetPreviousInvoice'
}

// #endregion