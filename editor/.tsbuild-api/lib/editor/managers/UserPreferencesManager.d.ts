import { TLUserPreferences } from '../../config/TLUserPreferences';
import { TLUser } from '../../config/createTLUser';
export declare class UserPreferencesManager {
    private readonly user;
    constructor(user: TLUser);
    updateUserPreferences: (userPreferences: Partial<TLUserPreferences>) => void;
    get userPreferences(): TLUserPreferences;
    get isDarkMode(): boolean;
    get animationSpeed(): number;
    get id(): string;
    get name(): string;
    get locale(): string;
    get color(): string;
    get isSnapMode(): boolean;
}
//# sourceMappingURL=UserPreferencesManager.d.ts.map