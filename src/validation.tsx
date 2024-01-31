import { currentDate } from "./util"

export function validateDate(date: Date | null): boolean {
    return date == null || currentDate().getTime() < date.getTime();
}

export function validateItems(items: number | null): boolean {
    return items == null || (!isNaN(items) && items > 0 && Number.isInteger(items));
}

export function validateDistance(distance: number | null): boolean {
    return distance == null || (!isNaN(distance) && distance > 0 && Number.isInteger(distance));
}

export function validateCart(cart: number | null): boolean {
    return cart == null || (!isNaN(cart) && cart > 0);
}
