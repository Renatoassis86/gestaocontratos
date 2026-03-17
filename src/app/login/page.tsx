import styles from './login.module.css'
import { signIn, signUp } from '../actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const error = (await searchParams).error as string | undefined;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Contratos<span className={styles.accent}>SaaS</span></h1>
          <p>Gestão Inteligente de Ciclo de Vida Contratual</p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            ⚠️ {error}
          </div>
        )}

        <form action={signIn} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" required placeholder="seu@email.com" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" name="password" required placeholder="••••••••" />
          </div>

          <button type="submit" className={styles.loginBtn}>Entrar</button>
        </form>

        <div className={styles.divider}>ou</div>

        <form action={signUp} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome Completo</label>
            <input type="text" id="name" name="name" placeholder="Seu Nome" />
          </div>
          
          <div className={styles.formGroup}>
            <input type="email" name="email" required placeholder="Email novo" style={{ display: 'none' }} />
            <input type="password" name="password" required placeholder="Senha nova" style={{ display: 'none' }} />
          </div>

          <button type="submit" className={styles.secondaryBtn}>Criar Conta</button>
        </form>
      </div>
    </div>
  )
}
