import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "chave-segura-dev")
    DEBUG = os.environ.get("DEBUG", True)
    # Exemplo de conexão com banco (modifique para seu caso)
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///db.sqlite3")

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}
