export default class Utils {
	static FETCH_STATUS = {
		IDLE: "IDLE",
		LOADING: "LOADING",
		SUCCESS: "SUCCESS",
		ERROR: "ERROR"
	};

	static generateName(length: number): string {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let randomName = "";

		for (let i = 0; i < length - 8; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			randomName += characters.charAt(randomIndex);
		}

		const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

		return currentDate + randomName;
	}

	static convertToUpperCaseUnderscore(text: string): string {
		const string = text.replace(/accept/gi, "");
		const parts = string.split(/[ _]+/).map(part => part.toUpperCase());

		if (parts[0] === "") parts.shift();
		const result = parts.join("_");

		return result;
	}

	static numberWithCommas(x: number | string): string {
		if (typeof x === "string") {
			return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		} else {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

	private static numberToWords(num: number): string {
		const onesWords = [
			"",
			"One",
			"Two",
			"Three",
			"Four",
			"Five",
			"Six",
			"Seven",
			"Eight",
			"Nine"
		];
		const teensWords = [
			"",
			"Eleven",
			"Twelve",
			"Thirteen",
			"Fourteen",
			"Fifteen",
			"Sixteen",
			"Seventeen",
			"Eighteen",
			"Nineteen"
		];
		const tensWords = [
			"",
			"Ten",
			"Twenty",
			"Thirty",
			"Forty",
			"Fifty",
			"Sixty",
			"Seventy",
			"Eighty",
			"Ninety"
		];

		const numString = num.toString();
		const numArray = numString.split("");
		const numLength = numArray.length;

		const words: string[] = [];

		const numToWordsHelper = (n: number): string => {
			let word = "";
			if (n >= 100) {
				word += onesWords[Math.floor(n / 100)] + " Hundred ";
				n %= 100;
			}
			if (n >= 20) {
				word += tensWords[Math.floor(n / 10)] + "-";
				n %= 10;
			}
			if (n > 0 && n < 10) {
				word += onesWords[n] + " ";
			} else if (n >= 11 && n <= 19) {
				word += teensWords[n - 10] + " ";
			}
			return word.trim();
		};

		if (num === 0) {
			return "Zero";
		}

		if (numLength === 1) {
			return onesWords[num];
		}

		// Convert thousands
		if (numLength > 3 && numLength < 7) {
			const thousands = Math.floor(num / 1000);
			words.push(numToWordsHelper(thousands) + " Thousand");
			num %= 1000;
		}

		// Convert millions
		if (numLength > 6 && numLength < 10) {
			const millions = Math.floor(num / 1000000);
			words.push(numToWordsHelper(millions) + " Million");
			num %= 1000000;
		}

		// Convert billions
		if (numLength > 9 && numLength < 13) {
			const billions = Math.floor(num / 1000000000);
			words.push(numToWordsHelper(billions) + " Billion");
			num %= 1000000000;
		}

		// Convert remaining hundreds, tens, and ones
		if (num > 0) {
			words.push(numToWordsHelper(num));
		}

		return words.join(" ");
	}

	static convertAmountToWords(amount: number, currency = "USD"): string {
		const splittedAmount = amount.toString().split(".");
		const dollars = parseInt(splittedAmount[0]);
		const cents = parseInt(splittedAmount[1]);

		let words = `${currency} ${this.numberToWords(dollars)}`;
		if (cents > 0) {
			words += ` Point ${this.numberToWords(cents)}`;
		}

		return words;
	}

	static callbackUrlFn(url: string): string {
		const urlParams = new URLSearchParams(window.location.search);
		const getCallbackUrl = encodeURIComponent(urlParams.get("callbackUrl") || "");
		const mergeUrl = url + (getCallbackUrl ? `?callbackUrl=${getCallbackUrl}` : "");
		const callbackUrl = mergeUrl || url;
		return callbackUrl;
	}

	static convertBytesToMB(bytes: number): number {
		return bytes / 1024 / 1024;
	}

	static slugify(text: string): string {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/\s+/g, "-") // Replace spaces with -
			.replace(/&/g, "-and-") // Replace & with 'and'
			.replace(/[^\w\-]+/g, "") // Remove all non-word chars
			.replace(/\-\-+/g, "-"); // Replace multiple - with single -
	}

	static generateUniqueSlug(slug: string, existingSlugs: string[]): string {
		const baseSlug = this.slugify(slug);
		let uniqueSlug = baseSlug;
		let counter = 1;

		while (existingSlugs.includes(uniqueSlug)) {
			uniqueSlug = `${baseSlug}-${counter}`;
			counter++;
		}

		return uniqueSlug;
	}

	static truncateFileName(fileName: string, maxLength: number = 18): string {
		const lastDotIndex = fileName.lastIndexOf(".");
		const hasExtension = lastDotIndex !== -1;
		const extension = hasExtension ? fileName.substring(lastDotIndex + 1) : "";
		const nameWithoutExtension = hasExtension ? fileName.substring(0, lastDotIndex) : fileName;

		if (fileName.length <= maxLength) {
			return fileName;
		}

		const truncatedName = nameWithoutExtension.substring(0, Math.max(0, maxLength));

		return `${truncatedName}...${extension ? `${extension}` : ""}`;
	}

	static generateOTP(limit: number = 4): string {
		const characters = "0123456789";
		let otp = "";
		for (let i = 0; i < limit; i++) {
			otp += characters.charAt(Math.floor(Math.random() * characters.length));
		}

		return otp;
	}

	static generateExpirationTime(type: "days" | "minutes", number: number): Date {
		const expirationTime = new Date();
		if (type === "days") {
			expirationTime.setDate(expirationTime.getDate() + number);
		} else {
			expirationTime.setMinutes(expirationTime.getMinutes() + number);
		}

		return expirationTime;
	}
}
