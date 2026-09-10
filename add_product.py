import json
import os
import shutil
import tempfile

from datetime import datetime
from pathlib import Path


# =====================================
# File Paths
# =====================================

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent

PRODUCTS_FILE = (
    PROJECT_ROOT
    / "data"
    / "products.json"
)

BACKUP_DIR = (
    PROJECT_ROOT
    / "data"
    / "backups"
)


# =====================================
# Read Products
# =====================================

def load_products():
    if not PRODUCTS_FILE.exists():
        raise FileNotFoundError(
            f"找不到商品資料：{PRODUCTS_FILE}"
        )

    with PRODUCTS_FILE.open(
        "r",
        encoding="utf-8"
    ) as file:
        products = json.load(file)

    if not isinstance(products, list):
        raise ValueError(
            "products.json 最外層必須是陣列。"
        )

    return products


# =====================================
# Input Helpers
# =====================================

def ask_required(prompt):
    while True:
        value = input(prompt).strip()

        if value:
            return value

        print("此欄位不能留空。")


def ask_price():
    while True:
        raw_price = input(
            "商品價格："
        ).strip()

        try:
            price = int(raw_price)

            if price <= 0:
                raise ValueError

            return price

        except ValueError:
            print("請輸入大於 0 的整數。")


def ask_list(prompt):
    raw_value = input(prompt).strip()

    if not raw_value:
        return []

    return [
        value.strip()
        for value in raw_value.split(",")
        if value.strip()
    ]


def ask_colors():
    colors = []

    print()
    print("輸入商品顏色。")
    print("格式：顏色名稱|色碼")
    print("例如：Black|#111111")
    print("完成後直接按 Enter。")

    while True:
        raw_color = input(
            "顏色："
        ).strip()

        if not raw_color:
            break

        if "|" not in raw_color:
            print(
                "格式錯誤，請使用：Black|#111111"
            )
            continue

        name, value = raw_color.split(
            "|",
            maxsplit=1
        )

        name = name.strip()
        value = value.strip()

        if not name or not value:
            print(
                "顏色名稱與色碼都不能留空。"
            )
            continue

        colors.append({
            "name": name,
            "value": value
        })

    return colors


# =====================================
# Product ID
# =====================================

def get_next_id(products):
    existing_ids = [
        product.get("id", 0)
        for product in products
        if isinstance(product.get("id"), int)
    ]

    if not existing_ids:
        return 1

    return max(existing_ids) + 1


# =====================================
# Create Product
# =====================================

def create_product(products):
    product_id = get_next_id(products)

    print()
    print(f"新商品 ID：{product_id}")
    print()

    name = ask_required(
        "商品名稱："
    )

    category = ask_required(
        "商品分類："
    )

    price = ask_price()

    cover_image = ask_required(
        "封面圖片路徑："
    )

    additional_images = ask_list(
        "其他圖片路徑（使用逗號分隔）："
    )

    sizes = ask_list(
        "尺寸（使用逗號分隔，例如 S,M,L）："
    )

    colors = ask_colors()

    # 保證封面圖片放在 Gallery 第一張
    images = [
        cover_image,
        *additional_images
    ]

    # 移除重複圖片，保留原本順序
    images = list(dict.fromkeys(images))

    product = {
        "id": product_id,
        "name": name,
        "category": category,
        "price": price,
        "image": cover_image,
        "images": images,
        "sizes": sizes,
        "colors": colors
    }

    return product


# =====================================
# Backup
# =====================================

def backup_products():
    BACKUP_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    timestamp = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    backup_file = (
        BACKUP_DIR
        / f"products_v{timestamp}.json"
    )

    shutil.copy2(
        PRODUCTS_FILE,
        backup_file
    )

    return backup_file


# =====================================
# Safe Write
# =====================================

def save_products(products):
    PRODUCTS_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    file_descriptor, temporary_path = (
        tempfile.mkstemp(
            prefix="products_",
            suffix=".tmp",
            dir=PRODUCTS_FILE.parent
        )
    )

    try:
        with os.fdopen(
            file_descriptor,
            "w",
            encoding="utf-8"
        ) as temporary_file:
            json.dump(
                products,
                temporary_file,
                ensure_ascii=False,
                indent=4
            )

            temporary_file.write("\n")

        os.replace(
            temporary_path,
            PRODUCTS_FILE
        )

    except Exception:
        temporary_file_path = Path(
            temporary_path
        )

        if temporary_file_path.exists():
            temporary_file_path.unlink()

        raise


# =====================================
# Main
# =====================================

def main():
    print("=" * 40)
    print("AVOE 商品新增工具")
    print("=" * 40)

    try:
        products = load_products()

        product = create_product(
            products
        )

        print()
        print("即將新增以下商品：")
        print()

        print(
            json.dumps(
                product,
                ensure_ascii=False,
                indent=4
            )
        )

        print()

        confirmation = input(
            "確定新增商品嗎？(y/n)："
        ).strip().lower()

        if confirmation not in {
            "y",
            "yes"
        }:
            print("已取消，沒有修改任何檔案。")
            return

        backup_file = backup_products()

        products.append(product)

        save_products(products)

        print()
        print("商品新增成功。")
        print(f"目前商品檔案：{PRODUCTS_FILE}")
        print(f"舊版本備份：{backup_file}")

    except json.JSONDecodeError as error:
        print()
        print("products.json 格式錯誤。")
        print(error)

    except Exception as error:
        print()
        print("新增商品失敗：")
        print(error)


if __name__ == "__main__":
    main()