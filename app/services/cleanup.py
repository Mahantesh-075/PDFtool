import os
import time
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

UPLOAD_DIR = Path("temp_uploads")
OUTPUT_DIR = Path("converted_files")
RETENTION_PERIOD = 3600 # 1 hour in seconds

def cleanup_old_files():
    """
    Deletes files in UPLOAD_DIR and OUTPUT_DIR that are older than RETENTION_PERIOD.
    """
    now = time.time()
    count = 0
    
    for directory in [UPLOAD_DIR, OUTPUT_DIR]:
        if not directory.exists():
            continue
            
        for file_path in directory.iterdir():
            if file_path.is_file():
                file_age = now - file_path.stat().st_mtime
                if file_age > RETENTION_PERIOD:
                    try:
                        file_path.unlink()
                        count += 1
                        logger.info(f"Deleted old file: {file_path}")
                    except Exception as e:
                        logger.error(f"Failed to delete {file_path}: {e}")
    
    return count
